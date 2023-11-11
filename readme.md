user: user_id, username, role ('normal', 'driver', 'stocker', 'accoutant'), work_unit, department

stock: stock_id, stock_name, address, stocker_id (user_id)

product: product_id, name, price, currency_unit

document: id, createdAt, content, stock_id

detail_document: document_id, product_id, quality


warehouse_receipt: receipt_id, stock_id, user_id, driver_id,  accoutant_id, document_id, createAt

detail_receipt:  receipt_id, product_id, quality
