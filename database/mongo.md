# mongo

MongoDB 将数据存储在类似 JSON 的灵活文档中，这意味着字段可能因具体文档而异，并且数据结构可能随着时间的推移而变化

MongoDB 本质上是一种分布式数据库，所以高可用性、横向扩展和地理分布都是内置且易用的。

## BSON

mongo 使用 [BSON](https://www.mongodb.com/json-and-bson) 的格式储存数据，·`BSON` 即 二进制的 `JSON`。

`BSON` 支持的数据类型比 `JSON` 更丰富，遍历也更快。

## 概念

| 概念        | 说明                              |
| ----------- | --------------------------------- |
| database    | 数据库                            |
| collection  | 数据库表                          |
| document    | 文档                              |
| field       | 域                                |
| index       | 索引                              |
| primary key | MongoDB 自动将\_id 字段设置为主键 |

## 插入

文档的数据结构可以不一致。

支持[插入](https://www.mongodb.com/docs/v6.0/tutorial/insert-documents/)单个或多个。

```javascript
db.document_name.insertOne({
  [field]: value,
});
```

## 查询

```javascript
// https://www.mongodb.com/docs/v6.0/reference/method/db.collection.find/#mongodb-method-db.collection.find
db.document_name.find(<query>, <projection>, <options>);
```

查询 [操作符](https://www.mongodb.com/docs/v6.0/reference/operator/query/) 。 例如：

```javascript
db.document_name.find({
  [field]: {
    $eq: "xxx", // 找到 field 为 xxx 的文档
  },
});
```

查询嵌套文档。 例如：

```javascript
db.document_name.find({
  [field.field1.fiel2]: value,
});
```

匹配数组。 例如：

```javascript
db.document_name.find({
  [arrField]: value // 数组包含 value 的文档
});

db.document_name.find({
  // 可以通过 . 运算符后追加 位置索引
  [arrField.index]: value // 数组第 index 个元素为 value 的文档
});

// 数组对象
db.document_name.find({
  // 可以通过 . 运算符后追加 属性名
  [arrField.field]: value // 数组中 field 值为 value 的文档
});

// 约定返回数据结构
db.document_name.find(query, {
  [field]: 0 // 0 为过滤 1 为保留
  [arrField]: {
    $slice: -1 // 正数是前几个 负数是后几个
  }
});
```

## 更新

支持[更新](https://www.mongodb.com/docs/v6.0/tutorial/update-documents/)单个或多个。

```javascript
db.document_name.updateOne(<filter>, {
  $set: {
    [field]: value
  }
}, <options>)
```

## 删除

支持[删除](https://www.mongodb.com/docs/v6.0/tutorial/remove-documents/)单个或多个。

```javascript
db.document_name.deleteOne({
  [field]: value,
});
```

## node

```javascript
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");

(async () => {
  const connectMongo = async () => {
    await client.connect();
    return client.db("mayi");
  };

  const mongo = await connectMongo();
  const usersCollection = mongo.collection("users");

  const add = async () => {
    return usersCollection.insertOne({
      name: "baozi",
    });
  };

  const search = async () => {
    return usersCollection.find({}).toArray();
  };

  const update = async () => {
    return usersCollection.updateOne(
      {
        name: "baozi",
      },
      {
        $set: {
          name: "baozi-new",
        },
      }
    );
  };

  const deleteUser = async () => {
    return usersCollection.deleteOne({
      name: "baozi-new",
    });
  };

  await add();
  let users = await search();
  console.log("新增后 ==>", users);
  await update();
  users = await search();
  console.log("更新后 ==>", users);
  await deleteUser();
  users = await search();
  console.log("删除后 ==>", users);
})();

```