
const token = process.env.NEXT_PUBLIC_API_TOKEN;

// please put NEXT_PUBLIC_API_TOKEN='<your-api-token>' in .env

if (!token) {
    throw new Error("API token is not defined");
}

const customFetchInterceptor = async <T>(
    url: string,
    options: RequestInit = {}
): Promise<T> => {
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Fetch Error:', errorData);
            throw new Error(errorData.message || 'Fetch error');
        }

        return response.json() as Promise<T>;
    } catch (error) {
        console.error('Custom Fetch Error:', error);
        throw error;
    }
};

export default customFetchInterceptor;

