const port = 3000 // чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)
/****************************************/
const express = require('express')
const fs = require('fs')
const app = express()


/***************************************/

/**
 * Активируем мидлвары :))
 */
app.use(express.json()) // Даем знать приложению, что работаем с json'ом
app.use('/', express.static('./public')) // запросы в корень нашего сайт отдают содержимое public

/***************************************/


/**
 * API Каталога
 */
app.get('/api/products', (req, res) => {
  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({ result: 0, text: err }))
    } else {
      res.send(data)
    }
  })
})


/***************************************/


/**
 * API Корзины
 */
app.get('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }))
    } else {
      res.send(data)
    }
  })
})

// Добавление нового товара в корзине
app.post('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }))
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data)
      // добавляем новый товар
      cart.contents.push(req.body)
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}')
        } else {
          res.send('{"result": 1}')
        }
      })
    }
  })
})

// Изменяем количество товара
app.put('/api/cart/inc/:id', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }))
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data)
      // ищем товар по id
      const find = cart.contents.find(el => el.id_product === +req.params.id)
      // изменяем количество
      find.quantity += req.body.quantity
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}')
        } else {
          res.send('{"result": 1}')
        }
      })
    }
  })
})

app.put('/api/cart/dec/:id', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }))
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data)
      // ищем товар по id
      const find = cart.contents.find(el => el.id_product === +req.params.id)
      // изменяем количество
      find.quantity -= req.body.quantity
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}')
        } else {
          res.send('{"result": 1}')
        }
      })
    }
  })
})

app.delete('/api/cart/del/:id', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }))
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data)
      // ищем товар по id
      const index = cart.contents.findIndex(el => el.id_product === +req.params.id)
      // изменяем количество
      cart.contents.splice(index, 1)
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}')
        } else {
          res.send('{"result": 1}')
        }
      })
    }
  })
})



/***************************************/


// проверка использования!!!
console.log(344444444444444443333)
/**
 * Запуск сервера
 * @type {string|number}
 */



/***************************************/



/**
 * Прямая ссылка из терминала:)))!!!
 */
// const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
