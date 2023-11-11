document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayPandas();

        const searchButton = document.getElementById('search-button');
        searchButton.addEventListener('click', function() {
        const query = document.getElementById('searchBox').value;
        fetchAndDisplayPandas(query);
        
    });
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', function() {
        fetchAndDisplayPandas(currentQuery, currentPage + 1);
    });
    const prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', function() {
        if (currentPage>1){  //只有不在第一页的时候才可以向前翻页
            fetchAndDisplayPandas(currentQuery, currentPage - 1);
        }
    });
});

let currentPage = 1; // 当前页码的全局变量
let currentQuery = ''; // 添加一个变量来保存当前查询

function fetchAndDisplayPandas(query='', page=1) {
    // 更新当前页码
    currentPage = page;
    currentQuery = query; // 更新当前查询
    // 构建带有查询参数的URL
    const url = `/api/pandas?name=${encodeURIComponent(query)}&page=${currentPage}`;
    
    fetch(url)
    .then(response => response.json())
        .then(data => {
            displayPandaCards(data); // 确保这里调用了 displayPandaCards
            updatePaginationControls(data); // 确保这里调用了 updatePaginationControls，并且传递了 data
        })
        .catch(error => console.error('Error:', error));
}

function updatePaginationControls(data) {
    // 更新页面上的分页控件，例如启用或禁用“上一页”和“下一页”按钮
    // 这将依赖于你页面上的具体实现
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    // 逻辑来决定何时启用或禁用分页按钮
    // 假设我们不知道总页数，我们可以在没有数据返回时禁用“下一页”按钮
    // 如果我们在返回的数据中有总页数信息，我们可以使用它来判断
    if (prevButton && nextButton) {
        prevButton.disabled = currentPage <= 1;
        nextButton.disabled = data.length < 8; // 使用传递的 data 参数
    } else {
        console.error('Pagination buttons not found');
    }
}


function displayPandaCards(pandas) {
    const container = document.getElementById('pandas-container');
    container.innerHTML = ''; // 清除旧内容

    pandas.forEach(panda => {
        const card = document.createElement('div');
        card.className = 'panda-card';
        card.innerHTML = `
            <a href="/panda/${panda.id}">${panda.name}</a>
            <a href="/panda/${panda.id}">
                <img src="${panda.image_url}" alt="${panda.name}" />
            </a>
            <p>性别: ${panda.gender}</p>
            <p>年龄: ${panda.age}</p>
        `;
        container.appendChild(card);
    });
}

function fetchPandaDetails(pandaId) {
    // 这里发送请求到后端以获取熊猫的详细信息
    fetch(`/api/panda/${pandaId}`)
        .then(response => response.json())
        .then(data => {
            displayPandaDetails(data); // 显示熊猫的详细信息
        })
        .catch(error => console.error('Error:', error));
}