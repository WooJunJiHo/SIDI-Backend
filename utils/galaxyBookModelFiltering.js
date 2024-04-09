const galaxyBook1 = ['갤럭시북1', '갤럭시북 1', '갤럭시 북1', '갤럭시 북 1']

const galaxyBook2 = ['갤럭시북2', '갤럭시북 2', '갤럭시 북2', '갤럭시 북 2']

const galaxyBook3 = ['갤럭시북3', '갤럭시북 3', '갤럭시 북3', '갤럭시 북 3']

const galaxyBook4 = ['갤럭시북4', '갤럭시북 4', '갤럭시 북4', '갤럭시 북 4']

const se = ['se']

const pro = ['pro', '프로']

const ultra = ['ultra', '울트라']

const odyssey = ['odyssey', '오디세이']

const threeHunderedSixty = ['360']

const go = ['go']





const galaxyBook1Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = galaxyBook1.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Galaxy Book 1'
        }
        return shouldInclude;
    });
    return filteredProducts
}


const galaxyBook2Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = galaxyBook2.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Galaxy Book 2'
        }
        return shouldInclude;
    });
    return filteredProducts
}


const galaxyBook3Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = galaxyBook3.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Galaxy Book 3'
        }
        return shouldInclude;
    });
    return filteredProducts
}


const galaxyBook4Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = galaxyBook4.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Galaxy Book 4'
        }
        return shouldInclude;
    });
    return filteredProducts
}


const seFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = se.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Galaxy Book Go'
        }
        return shouldInclude;
    });
    return filteredProducts
}


const proFiltering = function(data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = pro.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' Pro'
        }
        return shouldInclude;
    });
    return filteredProducts
}


const threeHunderedSixtyFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = threeHunderedSixty.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' 360'
        }
        return shouldInclude;
    });
    return filteredProducts
}


const goFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = go.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' Go'
        }
        return shouldInclude;
    });
    return filteredProducts
}


const ultraFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = ultra.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' Ultra'
        }
        return shouldInclude;
    });
    return filteredProducts
}


const odysseyFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = odyssey.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'GalaxyBook Odyssey'
        }
        return shouldInclude;
    });
    return filteredProducts
}


const normalFiltering = function (data) {
    const ultraFiltering = data.filter(item => {
        const shouldExclude = ultra.some(keyword => 
            item.title.includes(keyword)
        );
        return !shouldExclude;
    })
    const proFiltering = ultraFiltering.filter(item => {
        const shouldExclude = pro.some(keyword => 
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });
    const seFiltering = proFiltering.filter(item => {
        const shouldExclude = se.some(keyword => 
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });
    const odysseyFiltering = seFiltering.filter(item => {
        const shouldExclude = odyssey.some(keyword => 
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });
    const goFiltering = odysseyFiltering.filter(item => {
        const shouldExclude = go.some(keyword => 
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });
    const threeHunderedSixtyFiltering = goFiltering.filter(item => {
        const shouldExclude = threeHunderedSixty.some(keyword => 
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });
    const anotherFiltering = threeHunderedSixtyFiltering.filter(item => {
        const shouldExclude = ['12.0', '플렉스', '플랙스'].some(keyword => 
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });
    return anotherFiltering;
}


exports.galaxyBookFiltering = function (data) {

    const galaxyBook1List = galaxyBook1Filtering(data)
    const galaxyBook2List = galaxyBook2Filtering(data)
    const galaxyBook3List = galaxyBook3Filtering(data)
    const galaxyBook4List = galaxyBook4Filtering(data)

    const galaxyBookOdysseyList = odysseyFiltering(data)

    const galaxyBook1NormalList = normalFiltering(galaxyBook1List)
    const galaxyBook1ProList = proFiltering(galaxyBook1List)
    const galaxyBook1Pro360List = threeHunderedSixtyFiltering(galaxyBook1List)
    const galaxyBook1GoList = goFiltering(data)

    const galaxyBook2NormalList = normalFiltering(galaxyBook2List)
    const galaxyBook2_360List = threeHunderedSixtyFiltering(galaxyBook2List)
    const galaxyBook2ProList = proFiltering(galaxyBook2List)
    const galaxyBook2Pro360List = threeHunderedSixtyFiltering(galaxyBook2ProList)
    const galaxyBook2ProSEList = seFiltering(galaxyBook2List)
    const galaxyBook2UltraList = ultraFiltering(galaxyBook2List)
    const galaxyBook2GoList = goFiltering(galaxyBook2List)

    const galaxyBook3NormalList = normalFiltering(galaxyBook3List)
    const galaxyBook3_360List = threeHunderedSixtyFiltering(galaxyBook3List)
    const galaxyBook3ProList = proFiltering(galaxyBook3List)
    const galaxyBook3Pro360List = threeHunderedSixtyFiltering(galaxyBook3ProList)
    const galaxyBook3UltraList = ultraFiltering(galaxyBook3List)
    const galaxyBook3GoList = goFiltering(galaxyBook3List)

    const galaxyBook4NormalList = normalFiltering(galaxyBook4List)
    const galaxyBook4ProList = proFiltering(galaxyBook4List)
    const galaxyBook4Pro360List = threeHunderedSixtyFiltering(galaxyBook4ProList)
    const galaxyBook4UltraList = ultraFiltering(galaxyBook4List)

    const filteredList = [];

    const combinedList = filteredList.concat(
        galaxyBookOdysseyList, galaxyBook1NormalList, galaxyBook1ProList, galaxyBook1Pro360List, galaxyBook1GoList,
        galaxyBook2NormalList, galaxyBook2_360List, galaxyBook2ProList, galaxyBook2Pro360List, galaxyBook2ProSEList, galaxyBook2UltraList, galaxyBook2GoList,
        galaxyBook3NormalList, galaxyBook3_360List, galaxyBook3ProList, galaxyBook3Pro360List, galaxyBook3UltraList, galaxyBook3GoList,
        galaxyBook4NormalList, galaxyBook4ProList, galaxyBook4Pro360List, galaxyBook4UltraList,
    )
    
    const dataList = combinedList.filter(item => item !== null);

    return dataList;


}