insert into users(
    first_name,
    last_name,
    email
) values (
    ${first_name},
    ${last_name},
    ${email}
)
returning *;