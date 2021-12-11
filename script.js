const list = [
    {name: 'Mike', hp: 1, gld: 2},
    {name: 'Sam', hp: 10, gld: 20},
    {name: 'Dan', hp: 3, gld: 5}
];
const DB = new Promise((resolve, reject) => {
    const request = window.indexedDB.open('data', 1);
    request.onupgradeneeded = () => {
        request.result.createObjectStore('list', {autoIncrement: true});
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = e => reject(e);
});
const migrate = list => {
    DB.then(db => {
        const store = db.transaction('list', 'readwrite').objectStore('list');
        list.forEach(item => store.add(item));
    });
};
const getList = () => {
    DB.then(db => {
        const request = db.transaction('list').objectStore('list').getAll();
        request.onsuccess = e => console.log(e.target.result);
    });
};

migrate(list);
getList();