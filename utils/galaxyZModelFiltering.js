const flip1 = ['플립1', '플립 1', 'flip1', 'flip 1']
const flip2 = ['플립2', '플립 2', 'flip2', 'flip 2']
const flip3 = ['플립3', '플립 3', 'flip3', 'flip 3']
const flip4 = ['플립4', '플립 4', 'flip4', 'flip 4']
const flip5 = ['플립5', '플립 5', 'flip5', 'flip 5']

const fold1 = ['폴드1', '폴드 1', 'fold1', 'fold 1']
const fold2 = ['폴드2', '폴드 2', 'fold2', 'fold 2']
const fold3 = ['폴드3', '폴드 3', 'fold3', 'fold 3']
const fold4 = ['폴드4', '폴드 4', 'fold4', 'fold 4']
const fold5 = ['폴드5', '폴드 5', 'fold5', 'fold 5']

const ghzFilter = ['5g']





const flip1Filtering = function (data) {
    const filterGHz = data.map(item => {
        let modifiedTitle = item.title;
        ghzFilter.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const filteredProducts = filterGHz.filter(item => {
        const shouldInclude = flip1.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = '갤럭시 Z 플립 1'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const flip2Filtering = function (data) {
    const filterGHz = data.map(item => {
        let modifiedTitle = item.title;
        ghzFilter.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const filteredProducts = filterGHz.filter(item => {
        const shouldInclude = flip2.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = '갤럭시 Z 플립 2'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const flip3Filtering = function (data) {
    const filterGHz = data.map(item => {
        let modifiedTitle = item.title;
        ghzFilter.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const filteredProducts = filterGHz.filter(item => {
        const shouldInclude = flip3.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = '갤럭시 Z 플립 3'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const flip4Filtering = function (data) {
    const filterGHz = data.map(item => {
        let modifiedTitle = item.title;
        ghzFilter.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const filteredProducts = filterGHz.filter(item => {
        const shouldInclude = flip4.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = '갤럭시 Z 플립 4'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const flip5Filtering = function (data) {
    const filterGHz = data.map(item => {
        let modifiedTitle = item.title;
        ghzFilter.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const filteredProducts = filterGHz.filter(item => {
        const shouldInclude = flip5.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = '갤럭시 Z 플립 5'
        }
        return shouldInclude;
    });
    return filteredProducts;
}





const fold1Filtering = function (data) {
    const filterGHz = data.map(item => {
        let modifiedTitle = item.title;
        ghzFilter.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const filteredProducts = filterGHz.filter(item => {
        const shouldInclude = fold1.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = '갤럭시 Z 폴드 1'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const fold2Filtering = function (data) {
    const filterGHz = data.map(item => {
        let modifiedTitle = item.title;
        ghzFilter.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const filteredProducts = filterGHz.filter(item => {
        const shouldInclude = fold2.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = '갤럭시 Z 폴드 2'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const fold3Filtering = function (data) {
    const filterGHz = data.map(item => {
        let modifiedTitle = item.title;
        ghzFilter.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const filteredProducts = filterGHz.filter(item => {
        const shouldInclude = fold3.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = '갤럭시 Z 폴드 3'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const fold4Filtering = function (data) {
    const filterGHz = data.map(item => {
        let modifiedTitle = item.title;
        ghzFilter.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const filteredProducts = filterGHz.filter(item => {
        const shouldInclude = fold4.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = '갤럭시 Z 폴드 4'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const fold5Filtering = function (data) {
    const filterGHz = data.map(item => {
        let modifiedTitle = item.title;
        ghzFilter.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const filteredProducts = filterGHz.filter(item => {
        const shouldInclude = fold5.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = '갤럭시 Z 폴드 5'
        }
        return shouldInclude;
    });
    return filteredProducts;
}





exports.galaxyZFiltering = function (data) {

    const flip1List = flip1Filtering(data);
    const flip2List = flip2Filtering(data);
    const flip3List = flip3Filtering(data);
    const flip4List = flip4Filtering(data);
    const flip5List = flip5Filtering(data);

    const fold1List = fold1Filtering(data);
    const fold2List = fold2Filtering(data);
    const fold3List = fold3Filtering(data);
    const fold4List = fold4Filtering(data);
    const fold5List = fold5Filtering(data);

    const filteredList = [];

    const combinedList = filteredList.concat(
        flip1List, flip2List, flip3List, flip4List, flip5List,
        fold1List, fold2List, fold3List, fold4List, fold5List
    );
    
    const dataList = combinedList.filter(item => item !== null);

    return dataList;

}