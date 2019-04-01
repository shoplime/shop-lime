INSERT INTO streams (
    name,
    session_id,
    product_id,
    hls,
    broadcast_id,
    status,
    created_at
) values (
    ${name},
    ${session_id},
    ${product_id},
    ${hls},
    ${broadcast_id},
    ${status},
    ${created_at}
);