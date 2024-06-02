import pandas as pd
from typing import List
from fastapi import FastAPI, Query
from pydantic import BaseModel
import uvicorn

# 엑셀 파일에서 데이터 불러오기
df = pd.read_excel(r"/Users/joodongseong/Desktop/UniversityRecommendation/server_gaurontee/list_0520.xlsx")

app = FastAPI()

@app.get('/')
async def handle_request(
    q1: List[str] = Query(..., title="q1 (과목)", description="국어, 수학, 영어, 탐구1, 탐구2"),
    q2: str = Query(..., title="q2 (질문2)", description="예, 아니오, 무관"),
    q3: str = Query(..., title="q3 (질문3)", description="예, 아니오, 무관"),
    q4: str = Query(..., title="q4 (질문4)", description="예, 아니오, 무관"),
    q5: str = Query(..., title="q5 (질문5)", description="예, 아니오")
):
    # 받은 데이터를 api 딕셔너리에 저장
    api = {
        'q1': q1,
        'q2': q2,
        'q3': q3,
        'q4': q4,
        'q5': q5
    }

    # 필터링 1 
    user_count = len(api['q1'])
    filtering = df[df['subject'] >= 0]
    '''
    filtering = df
    list_element = api['q1']
    if "," in api['q1']:
        list_element = api['q1'].split(",")
    
    
    if len(list_element) > 0:
        filtering = df.loc(df["subject"] <= len(list_element))
    '''
    
    # 필터링 2


    # filtering = df[df['subject'] <= len(list_element)]
    # filtering = df[df['subject'] <= user_count]


    math_user = api['q2']
    if math_user == '예':
        math_user = 1
        filtering2 = filtering[filtering['math_essay'] == math_user]
    elif math_user == '아니오':
        math_user = 0
        filtering2 = filtering[filtering['math_essay'] == math_user]
    else:
        filtering2 = filtering

    # 필터링 3
    user_record = api['q3']
    if user_record == '예':
        user_record = 1
        filtering3 = filtering2[filtering2['school_record'] == user_record]
    elif user_record == '아니오':
        user_record = 0
        filtering3 = filtering2[filtering2['school_record'] == user_record]
    else:
        filtering3 = filtering2

    # 필터링 4
    user_attendence = api['q4']
    if user_attendence == '예':
        user_attendence = 1
        filtering4 = filtering3[filtering3['attendence'] == user_attendence]
    elif user_attendence == '아니오':
        user_attendence = 0
        filtering4 = filtering3[filtering3['attendence'] == user_attendence]
    else:
        filtering4 = filtering3

    # 필터링 5
    user_style = api['q5']
    if user_style == '예':
        user_style = 0
        filtering5 = filtering4[filtering4['index'] == user_style]
    elif user_style == '아니오':
        user_style = 0
        filtering5 = filtering4[filtering4['index'] == user_style]
    else:
        filtering5 = filtering4

    before_df = filtering5[['university', 'division', 'major', 'date']]
    before_df['name'] = before_df['university'] + ' ' + before_df['division'] + ' ' + before_df['major']
    before_df = before_df.drop(columns=['university', 'division', 'major'])
    before_df['date'] = before_df['date'].dt.strftime('%Y-%m-%d')

    to_client = before_df.apply(lambda row: f"{row['name']}_{row['date']}", axis=1).tolist()

    return to_client

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)

