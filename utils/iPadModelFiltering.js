const iPad = ['아이패드', 'ipad'];

const pro = ['프로', 'pro'];

const air = ['에어', 'air'];

const mini = ['미니', 'mini'];

const space = ['16', '32', '64', '128', '256', '512', 'm1', 'm2', 'gb', 'g', '기가'];





const iPadModelFiltering = function (data) {

    const filteredProducts = data.filter(item => {
        const shouldInclude = iPad.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = 'iPad'
        }
        return shouldInclude;
    });
    return filteredProducts;

}


//모델 필터링
//모델 필터링
const proFiltering = function (data) {

    const filteredProducts = data.filter(item => {
        const shouldInclude = pro.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' Pro'
        }
        return shouldInclude;
    });

    return filteredProducts;

}


const airFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = air.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' Air'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const miniFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = mini.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' Mini'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const normalFiltering = function (data) {
    const proFiltering = data.filter(item => {
        const shouldExclude = pro.some(keyword =>
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });

    const airFiltering = proFiltering.filter(item => {
        const shouldExclude = air.some(keyword =>
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });

    const miniFiltering = airFiltering.filter(item => {
        const shouldExclude = mini.some(keyword =>
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });

    const generationTen = miniFiltering.filter(item => {
        const shouldInclude = ['10세대', '10'].some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' 10th Gen'
        }
        return shouldInclude;
    })

    return generationTen;

}


//세대 필터링
//세대 필터링
const generationTwo = function (data) {
    const filteredProducts = data.map(item => {
        let modifiedTitle = item.title;
        space.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const twoFiltering = filteredProducts.filter(item => {
        if(item.assetName === '아이패드 프로 11인치') {
            const shouldInclude = ['2세대'].some(keyword =>
                item.title.includes(keyword)
            );
            if(shouldInclude === true) {
                item.assetName = item.assetName + ' 2nd Gen'
            }
            return shouldInclude;
        } else {
            const shouldInclude = ['2세대', '2'].some(keyword =>
                item.title.includes(keyword)
            );
            if(shouldInclude === true) {
                item.assetName = item.assetName + ' 2nd Gen'
            }
            return shouldInclude;
        }
    });
    return twoFiltering;
}


const generationThree = function (data) {
    const filteredProducts = data.map(item => {
        let modifiedTitle = item.title;
        space.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const threeFiltering = filteredProducts.filter(item => {
        if(item.assetName === '아이패드 프로 11인치') {
            const shouldInclude = ['3세대'].some(keyword =>
                item.title.includes(keyword)
            );
            if(shouldInclude === true) {
                item.assetName = item.assetName + ' 3rd Gen'
            }
            return shouldInclude;
        } else {
            const shouldInclude = ['3세대', '3'].some(keyword =>
                item.title.includes(keyword)
            );
            if(shouldInclude === true) {
                item.assetName = item.assetName + ' 3rd Gen'
            }
            return shouldInclude;
        }
    });
    return threeFiltering;
}


const generationFour = function (data) {
    const filteredProducts = data.map(item => {
        let modifiedTitle = item.title;
        space.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const fourFiltering = filteredProducts.filter(item => {
        if(item.assetName === '아이패드 프로 11인치') {
            const shouldInclude = ['4세대'].some(keyword =>
                item.title.includes(keyword)
            );
            if(shouldInclude === true) {
                item.assetName = item.assetName + ' 4th Gen'
            }
            return shouldInclude;
        } else {
            const shouldInclude = ['4세대', '4'].some(keyword =>
                item.title.includes(keyword)
            );
            if(shouldInclude === true) {
                item.assetName = item.assetName + ' 4th Gen'
            }
            return shouldInclude;
        }
    });
    return fourFiltering;
}


const generationFive = function (data) {
    const filteredProducts = data.map(item => {
        let modifiedTitle = item.title;
        space.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const fiveFiltering = filteredProducts.filter(item => {
        const shouldInclude = ['5세대', '5'].some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' 5th Gen'
        }
        return shouldInclude;
    });
    return fiveFiltering;
}


const generationSix = function (data) {
    const filteredProducts = data.map(item => {
        let modifiedTitle = item.title;
        space.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const sixFiltering = filteredProducts.filter(item => {
        const shouldInclude = ['6세대', '6'].some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' 6th Gen'
        }
        return shouldInclude;
    });
    return sixFiltering;
}



//화면 크기 필터링
//화면 크기 필터링
const pro11Inch = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = ['11인치', '11'].some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' 11Inch'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const pro12Inch = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = ['12.9인치', '12.9'].some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' 12.9Inch'
        }
        return shouldInclude;
    });
    return filteredProducts;
}





exports.iPadFiltering = function (data) {

    const iPadList = iPadModelFiltering(data);
    const iPadProList = proFiltering(iPadList);
    const iPadAirList = airFiltering(iPadList);
    const iPadMiniList = miniFiltering(iPadList);
    const iPadNormalList = normalFiltering(iPadList);

    const iPadPro11InchList = pro11Inch(iPadProList);
    const iPadPro12InchList = pro12Inch(iPadProList);

    const iPadAir4List = generationFour(iPadAirList);
    const iPadAir5List = generationFive(iPadAirList);
    const iPadAir6List = generationSix(iPadAirList);

    const iPadPro11Inch2List = generationTwo(iPadPro11InchList);
    const iPadPro11Inch3List = generationThree(iPadPro11InchList);
    const iPadPro11Inch4List = generationFour(iPadPro11InchList);

    const iPadPro12Inch4List = generationFour(iPadPro12InchList);
    const iPadPro12Inch5List = generationFive(iPadPro12InchList);
    const iPadPro12Inch6List = generationSix(iPadPro12InchList);

    const iPadMini4List = generationFour(iPadMiniList);
    const iPadMini5List = generationFive(iPadMiniList);
    const iPadMini6List = generationSix(iPadMiniList);



    const filteredList = [];

    const combinedList = filteredList.concat(
        iPadPro11Inch2List, iPadPro11Inch3List, iPadPro11Inch4List,
        iPadPro12Inch4List, iPadPro12Inch5List, iPadPro12Inch6List,
        iPadAir4List, iPadAir5List, iPadAir6List,
        iPadMini4List, iPadMini5List, iPadMini6List,
        iPadNormalList
    );

    const dataList = combinedList.filter(item => item !== null);

    return dataList;

};