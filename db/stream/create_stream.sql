INSERT INTO streams (
    name,
    session_id,
    product_id,
    hls,
    broadcast_id,
    status,
    created_at,
    url
) values (
    ${name},
    ${session_id},
    ${product_id},
    ${hls},
    ${broadcast_id},
    ${status},
    ${created_at},
    ${url}
);