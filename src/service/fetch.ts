export const fetchQ1 = async () => {
    try {
        const res = await fetch('api/questions');
        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.error(error);
    }
};
