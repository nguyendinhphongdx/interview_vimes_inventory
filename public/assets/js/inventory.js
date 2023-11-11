const state = {
    date: {
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    },
    depbt: 0,
    balance: 1000000,
    receipt_id: 0,
    currentUser: null,
    accoutant: {
        user_id: 0,
        username: '...',
        role: '...',
    },
    driver: {
        user_id: 0,
        username: '...',
        role: '...',
    },
    document: {
        document_id: 0,
        content: '...',
        stock_id: 0,
        status: '...',
    },
    stock: {
        stock_id: 0,
        stock_name: '...',
        address: '...',
        stocker_id: 0,
        stocker: {
            user_id: 0,
            username: '...',
        }
    },
    products: [

    ]
}
const global_data = {
    users: g_users,
    documents: g_documents,
    detail_documents: g_detail_documents,
    stocks: g_stocks,
    products: g_products,
    detail_receipts: g_detail_receipts,
    receipts: g_receipts
}

$(function () {
    initPage();
});
function initPage() {


    $('#btn-logout').click((e) => {
        logout();
    });
    $('#btn-show-modal').click(() => {
        $('#modalGroups').css({ "background": "rgba(0,0,0,.3)", "opacity": 1 });
        renderProducts();
        $('#modalGroups').show();
    });

    $('#btn-cancel').click(() => {
        $('#modalGroups').hide();
    });

    $('#btn-save').click(() => {
        saveProducts();
        renderReceipt();
        $('#modalGroups').hide();
    });

    $('#option-drivers').change((e) => {
        changeDriver(e.target.value);
    });
    $('#option-accountants').change((e) => {
        changeAccountant(e.target.value);
    });
    $('#btn-save-receipt').click((e) => {
        save();
    });

    initialization();

    renderReceipt();
}


const initialization = () => {
    const userStored = localStorage.getItem('currentUser');
    const documentStored = localStorage.getItem('currentDoc');

    if (!userStored || !documentStored) return window.location.href = "/login";
    state.currentUser = JSON.parse(userStored);
    state.document = JSON.parse(documentStored);
    const stock = global_data.stocks.find(stock => stock.stock_id == state.document.stock_id);
    const stocker = global_data.users.find(user => user.user_id == stock.stocker_id);
    state.stock = {
        ...stock,
        stocker: stocker,
    };
    const details = global_data.detail_documents.filter(i => i.document_id == state.document.document_id);
    state.products = details.map(detail => {
        const product = global_data.products.find(p => p.product_id == detail.product_id);
        return {
            ...product,
            quality: detail.quality,
            exact_quantity: detail.quality
        }
    });
}

const renderProducts = () => {
    const str = state.products.reduce((acc, cur) => {
        return acc + `
            <tr>
            <td class="align-middle">${cur.name}</td>
            <td>${cur.price}</td>
            <td>${cur.quality}</td>
            <td>
            <input id="product-value-${cur.product_id}"  type="number" class="form-control product-values" value="${cur.exact_quantity}">
            </td>
            <td class="text-end"><span class="fw-bolder" id="product-money-${cur.product_id}">${cur.exact_quantity * cur.price}</span> <i class="fa fa-ellipsis-h  ms-2"></i></td>
        </tr>
        `
    }, '');
    $('#tbody-products').html(str);
}

const saveProducts = () => {
    $('[id^="product-value-"]').each(function () {
        const product_id = $(this).attr('id').split('-')[2];
        const product_value = $(this).val();
        console.log({
            product_id,
            product_value
        });
        const index = state.products.findIndex(i => i.product_id == product_id);
        state.products[index] = {
            ...state.products[index],
            exact_quantity: product_value
        }
    });
}

const changeDriver = (driver_id) => {
    if (!Number(driver_id)) return;
    const driver = global_data.users.find(user => user.user_id == driver_id);
    state.driver = driver;
    renderReceipt();
}
const changeAccountant = (accountant_id) => {
    if (!Number(accountant_id)) return;
    const accountant = global_data.users.find(user => user.user_id == accountant_id);
    state.accoutant = accountant;
    renderReceipt();
}

const renderReceipt = () => {
    const data = {
        date_string: `Ngày ${state.date.date} tháng ${state.date.month} năm ${state.date.year}`,
        document_string: `${state.document.content} số ${state.document.document_id}`,
        driver_name: state.driver.username,
        stock_name: `${state.stock.stock_name} <b>địa điểm</b> ${state.stock.address}`,
        work_unit: state.currentUser.work_unit,
        department: state.currentUser.department,
        receipt_id: state.receipt_id,
        depbt: state.depbt,
        balance: formatCurrency(state.balance),
        total_string: readMoney(couterReceipt().toString()),
        document_id: state.document.document_id,
        username: state.currentUser.username,
        stocker_name: state.stock.stocker.username,
        accountant_name: state.accoutant.username,
        products: state.products,
    }
    const classes = ['driver_name', 'date_string', 'username', 'document_string', 'stock_name', 'stocker_name'];

    for (const iterator in data) {
        if (classes.includes(iterator)) {
            const selectors = document.getElementsByClassName(iterator);
            for (let index = 0; index < selectors.length; index++) {
                const element = selectors[index];
                if (element) {
                    element.innerHTML = data[iterator];
                }
            }
        } else {
            const selector = document.getElementById(iterator);
            if (selector) {
                selector.innerHTML = data[iterator];
            }
        }
    }

    let strProducts = `
        <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
        </tr>
    `;

    strProducts = data.products.reduce((acc, cur, index) => {
        return acc + `
        <tr>
        <td>${index}</td>
        <td>${cur.name}</td>
        <td>${cur.product_id}</td>
        <td>${cur.currency_unit}</td>
        <td>${cur.quality}</td>
        <td>${cur.exact_quantity}</td>
        <td>${formatCurrency(cur.price)}</td>
        <td>${formatCurrency(cur.price * cur.exact_quantity)}</td>
    </tr>
        `;
    }, strProducts);

    strProducts += `
    <tr>
        <td></td>
        <td>Cộng</td>
        <td>x</td>
        <td>x</td>
        <td>x</td>
        <td>x</td>
        <td>x</td>
        <td>${formatCurrency(couterReceipt())}</td>
    </tr>
    `;
    $('#tbody-document-products').html(strProducts);
}

const couterReceipt = () => {
    return state.products.reduce((acc, cur) => {
        return acc + cur.price * cur.exact_quantity
    }, 0);
}

function readGroup(group) {
    let readDigit = [" Không", " Một", " Hai", " Ba", " Bốn", " Năm", " Sáu", " Bảy", " Tám", " Chín"];
    var temp = "";
    if (group == "000") return "";
    temp = readDigit[parseInt(group.substring(0, 1))] + " Trăm";
    if (group.substring(1, 2) == "0")
        if (group.substring(2, 3) == "0") return temp;
        else {
            temp += " Lẻ" + readDigit[parseInt(group.substring(2, 3))];
            return temp;
        }
    else
        temp += readDigit[parseInt(group.substring(1, 2))] + " Mươi";
    if (group.substring(2, 3) == "5") temp += " Lăm";
    else if (group.substring(2, 3) != "0") temp += readDigit[parseInt(group.substring(2, 3))];
    return temp;
}

function readMoney(num) {
    if ((num == null) || (num == "")) return "";
    let temp = "";
    while (num.length < 18) {
        num = "0" + num;
    }
    let g1 = num.substring(0, 3);
    let g2 = num.substring(3, 6);
    let g3 = num.substring(6, 9);
    let g4 = num.substring(9, 12);
    let g5 = num.substring(12, 15);
    let g6 = num.substring(15, 18);
    if (g1 != "000") {
        temp = readGroup(g1);
        temp += " Triệu";
    }
    if (g2 != "000") {
        temp += readGroup(g2);
        temp += " Nghìn";
    }
    if (g3 != "000") {
        temp += readGroup(g3);
        temp += " Tỷ";
    } else if ("" != temp) {
        temp += " Tỷ";
    }
    if (g4 != "000") {
        temp += readGroup(g4);
        temp += " Triệu";
    }
    if (g5 != "000") {
        temp += readGroup(g5);
        temp += " Nghìn";
    }
    temp = temp + readGroup(g6);
    temp = temp.replaceAll("Một Mươi", "Mười");
    temp = temp.trim();
    temp = temp.replaceAll("Không Trăm", "");
    temp = temp.trim();
    temp = temp.replaceAll("Mười Không", "Mười");
    temp = temp.trim();
    temp = temp.replaceAll("Mươi Không", "Mươi");
    temp = temp.trim();
    if (temp.indexOf("Lẻ") == 0) temp = temp.substring(2);
    temp = temp.trim();
    temp = temp.replaceAll("Mươi Một", "Mươi Mốt");
    temp = temp.trim();
    let result = temp.substring(0, 1).toUpperCase() + temp.substring(1).toLowerCase();
    return (result == "" ? "Không" : result) + " đồng chẵn"
}

const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
}

const formatCurrency = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

const save = async () => {
    try {
        const { accoutant, document, driver, currentUser, products } = state;
        if (!accoutant?.user_id) throw new Error('Invalid accoutant');
        if (!document?.document_id) throw new Error('Invalid document');
        if (!driver?.user_id) throw new Error('Invalid driver');
        if (!currentUser?.user_id) throw new Error('Invalid current user');
        if (products.length <= 0) throw new Error('Invalid products length');

        const body = {
            accoutant_id: accoutant.user_id,
            document_id: document.document_id,
            driver_id: driver.user_id,
            user_id: currentUser.user_id,
            products: products.map(product => ({
                product_id: product.product_id,
                quality: product.exact_quantity
            })),
        }

        const result = await axios.post('/api/inventory/create', body);
        toastr.success('create successfully');
    } catch (error) {
        toastr.error(error.message);
    }


}