document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    // 我们可以添加更多的JavaScript代码来处理页面动态功能
});
document.addEventListener('DOMContentLoaded', function() {
    // 获取数据并在表格中展示
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('data-table-body');
            // 清空表格
            tableBody.innerHTML = '';
            // 为每个数据项创建表格行
            data.forEach(item => {
                const row = `<tr>
                                <td>${item.id}</td>
                                <td>${item.name}</td>
                                <td>${item.description}</td>
                             </tr>`;
                tableBody.innerHTML += row;
            });
        });
});
