const server = 'https://jsonplaceholder.typicode.com/posts';     //!адрес тестового сервера взято с JSONPlaceholder

const sendData = (data, callBack, falseCallBack) => {            //! функция отправки данных на сервер
    const request = new XMLHttpRequest();
    request.open('POST', server);

    request.addEventListener('readystatechange', () => {          //! "слушаем" изменения стадии обработки запроса
        if (request.readyState !== 4) return;                      //! пока не достигнет конечной стадии прирываем работу функции затем
        if (request.status === 200 || request.status === 201) {
            const response = JSON.parse(request.responseText)     //! если статус "правильный" парсим(JSON.parse(request.responseText))данные из сервера т.к. они приходят в виде строки json (из json --> в объект js)
            console.log(response)

            callBack(response.id);                                //! вызываем callBack функцию с (response.id) в качестве параметра(данные из сервера в виде объекта)
        } else {
            falseCallBack(request.status)
            throw new Error(request.status)                   //!   если статус "не правильный(404 и др.)"  вызываем falseCallBack; метод throw прирывает работу функции
        }
    });

    request.send(data);
}



const formElems = document.querySelectorAll('.form');        //! получаем все формы на странице по классу '.form'

const formHandler = (form) => {
    form.addEventListener('submit', (event) => {              //! навешали слушатель события отправки формы (стандартное браузерное событие)
        event.preventDefault();                                   //! отключили перезагрузку страницы (отправка не проиходит)               
        const data = {};                                      //! создали пустой объект data

        for (const { name, value } of form.elements) {                    //! обращаемся к свойству форм (elements содержат все элементы формы)   //! применено делегирование {name, value}
            if (name) {
                data[name] = value                                      //! создаем новое свойство name в объекте data
            }
        }

        const smallElem = document.createElement('small');

        sendData(JSON.stringify(data),                         //!вызываем sendData с параметром data приведенным к виду строки JSON через метод (JSON.stringify(data)
            (id) => {
                smallElem.innerHTML = 'успешно отправлено #' + id + '! <br> скоро с вами свяжутся';    //!
                smallElem.style.color = 'green';                                                        //!     callBack
                form.append(smallElem);                                                                 //!
            },
            (err) => {
                smallElem.textContent = 'error';                                                      //!
                smallElem.style.color = 'red';                                                          //!     falseCallBack
                form.append(smallElem);                                                                 //!
            });

        form.reset();                                            //! очистили поля флрмы

    })
};


formElems.forEach(formHandler);

