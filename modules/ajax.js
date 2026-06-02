class Ajax {
    async _send(method, url, data) {
        const options = {
            method: method,
            headers: {}
        };

        // Если есть данные для отправки (POST/PATCH)
        if (data !== undefined && data !== null) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }

        // Выполняем сам запрос и ждем ответ и читаем ответ сервера
        const response = await fetch(url, options);
        const text = await response.text();
        // Если текст есть, превращаем его в JSON-объект
        const payload = text ? JSON.parse(text) : null;
        // Возвращаем объект с данными и статусами
        return {
            data: payload, 
            status: response.status, 
            ok: response.ok
        };
    }

    async get(url) { 
        return this._send('GET', url); 
    }
    
    async post(url, data) { 
        return this._send('POST', url, data); 
    }
    
    async patch(url, data) { 
        return this._send('PATCH', url, data); 
    }
    
    async delete(url) { 
        return this._send('DELETE', url); 
    }
}

export const ajax = new Ajax();