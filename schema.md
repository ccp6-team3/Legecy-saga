# Schema Design

`pk` = Primary Key
`uni` = Unique
`nn` = Not Null
`ref: >` = Many to one
`ref: <` = One to many
`ref: -` = One to one

## Users Table

```
Table users {
  id serial [pk]
  username varchar(32) [uni, nn]
  email varchar(32) [uni, nn, index]
  first_name varchar(32)
  last_name varchar(32)
  password vachar(32)
}
```

## Movie Review Table

```
Table movie_reviews {
  id serial [pk]
  movie_id int(32) [nn, index]
  review varchar(4000)
}
```

## TV Reviews List Table

```
Table tv_reviews {
  id serial [pk]
  tv_show_id int(32) [nn, index]
  review varchar(4000)
}
```
