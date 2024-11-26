export class Engine{
    // Проверка столкновений
    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

};


export class Map{

    levels(a, b){
    // Уровни игры
        const levels = [
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 5, 0, 0, 0, 0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1],
                [1, 2, 1, 0, 2, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 2, 1, 0, 2, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 2, 0, 0, 3, 1, 0, 1, 0, 1],
                [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [1, 2, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 1, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 4, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]  
        ];   
        if (a === "length"){
            return levels.length
        }else if(a === "level"){
            return (levels[b])
        }       

    };
    generateRandomLevel(width, height) {
        let map = [];
        let seed = Math.random() * 10;
        let rooms = Math.floor( Math.random() * 5);
        console.log("Rooms:"+rooms)
        // Генерация карты с случайными значениями
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                let tile = 0;
                console.log(rooms)
                if (map.length === 0 || row.length === 0 || map.length === 18 || row.length === 24){
                    tile = 1;
                }else{
                    if(true){
                        if (rooms === 4 ){
                            if (row.length === 12 || map.length === 9 ){
                                tile = Math.random() < 0.3 ? 0 : 1;  
                            }else{
                                tile = Math.random() < 0.8 ? 0 : 1;  
                            }
                        }else if(rooms === 3){
                            if (row.length === 12 && map.length < 9 || map.length === 9){
                                    tile = Math.random() < 0.3 ? 0 : 1;  
                            }else{
                                tile = Math.random() < 0.8 ? 0 : 1;  
                            }
                        }else if(rooms === 2 ){
                            if (row.length === 12){
                                tile = Math.random() < 0.3 ? 0 : 1;  
                            }else{
                                tile = Math.random() < 0.8 ? 0 : 1;  
                            }
                        }
                        else if(rooms === 1 ){
                            tile = Math.random() < 0.8 ? 0 : 1;
                        }else{
                            tile = Math.random() < 0.8 ? 0 : 1;
                        }
                    }else{
                        tile = Math.random() < 0.9 ? 0 : 1;  
                    }
                }


                row.push(tile);
            }
            map.push(row);
        }
    
        // Добавление монет (2), ключа (3) и двери (4) на случайные позиции
        let coinCount = Math.floor(Math.random() * 5) + 5; // случайное количество монет (от 5 до 9)
        let keyCount = 1;  // Один ключ
        let doorCount = 1; // Одна дверь
        let spawnPoint = 1; // Одна дверь
        
        while (coinCount > 0) {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            if (map[y][x] === 0) {
                if(map[y+1][x+1] === 0 && map[y-1][x-1] === 0){
                    map[y][x] = 2;  // Размещаем монету
                    coinCount--;
                }

            }
        }
    
        while (keyCount > 0) {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            if (map[y][x] === 0) {
                if(map[y+1][x+1] === 0 && map[y-1][x-1] === 0){
                    map[y][x] = 3;  // Размещаем ключ
                    keyCount--;
                }

            }
        }
    
        while (doorCount > 0) {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            if (map[y][x] === 0) {
                if(map[y+1][x+1] === 0 && map[y-1][x-1] === 0){
                    map[y][x] = 4;  // Размещаем дверь
                    doorCount--;
                }

            }
        }
        while (spawnPoint > 0) {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            if (map[y][x] === 0) {
                if(map[y+1][x+1] === 0 && map[y-1][x-1] === 0){
                    map[y][x] = 5;  
                    spawnPoint--;
                }

            }
        }
    
        return map;
    };
    
      
}