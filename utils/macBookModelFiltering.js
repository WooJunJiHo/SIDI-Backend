const macBook = ['macbook', '맥북']

const m1 = ['m1']
const m2 = ['m2']
const m3 = ['m3']

const max = ['맥스', 'max']
const pro = ['프로', 'pro']
const air = ['에어', 'air']

const thirteen = ['13', '13인치', '13inch']
const fourteen = ['14', '14인치', '14inch']
const sixteen = ['16', '16인치', '16inch']

const ramFilter = ['16', '16g', '16gb', '16기가']



const macBookModelFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = macBook.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = 'MacBook'
        }
        return shouldInclude;
    })
    return filteredProducts;
}



//클래스 필터링
//클래스 필터링
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


const proFiltering = function (data) {

    const filterMax = data.filter(item => {
        const shouldExclude = max.some(keyword =>
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });

    const filteredProducts = filterMax.filter(item => {
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


const maxFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = max.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' Max'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


//칩셋 필터링
//칩셋 필터링
const m1Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = m1.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' M1'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const m2Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = m2.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' M2'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const m3Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = m3.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' M3'
        }
        return shouldInclude;
    });
    return filteredProducts;
}



//화면크기 필터링
//화면크기 필터링
const thirteenFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = thirteen.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' 13Inch'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const fourteenFiltering = function (data) {
    const filterRam = data.map(item => {
        let modifiedTitle = item.title;
        ramFilter.forEach(keyword => {
            modifiedTitle = modifiedTitle.replace(keyword, '');
        });
        return { ...item, title: modifiedTitle };
    });

    const filteredProducts = filterRam.filter(item => {
        const shouldInclude = fourteen.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' 14Inch'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const sixteenFiltering = function (data) {

    const filterRam = data.filter(item => {
        const shouldExclude = ['14'].some(keyword =>
            item.title.includes(keyword)
        );
        return !shouldExclude;
    })

    const filteredProducts = filterRam.filter(item => {
        const shouldInclude = sixteen.some(keyword =>
            item.title.includes(keyword)
        );
        if (shouldInclude === true) {
            item.assetName = item.assetName + ' 16Inch'
        }
        return shouldInclude;
    });
    return filteredProducts;
}




exports.macBookFiltering = function (data) {

    const macBookList = macBookModelFiltering(data);

    const m1List = m1Filtering(macBookList);
    const m2List = m2Filtering(macBookList);
    const m3List = m3Filtering(macBookList);

    const m1AirList = airFiltering(m1List);
    const m1ProList = proFiltering(m1List);
    const m1MaxList = maxFiltering(m1List);

    const m2AirList = airFiltering(m2List);
    const m2ProList = proFiltering(m2List);
    const m2MaxList = maxFiltering(m2List);

    const m3AirList = airFiltering(m3List);
    const m3ProList = proFiltering(m3List);
    const m3MaxList = maxFiltering(m3List);


    const m1Air13InchList = thirteenFiltering(m1AirList);

    const m1Pro13InchList = thirteenFiltering(m1ProList);
    const m1Pro14InchList = fourteenFiltering(m1ProList);
    const m1Pro16InchList = sixteenFiltering(m1ProList);

    const m1Max14InchList = fourteenFiltering(m1MaxList);
    const m1Max16InchList = sixteenFiltering(m1MaxList);


    const m2Air13InchList = thirteenFiltering(m2AirList);

    const m2Pro14InchList = fourteenFiltering(m2ProList);
    const m2Pro16InchList = sixteenFiltering(m2ProList);

    const m2Max14InchList = fourteenFiltering(m2MaxList);
    const m2Max16InchList = sixteenFiltering(m2MaxList);


    const m3Air13InchList = thirteenFiltering(m3AirList);

    const m3Pro14InchList = fourteenFiltering(m3ProList);
    const m3Pro16InchList = sixteenFiltering(m3ProList);

    const m3Max14InchList = fourteenFiltering(m3MaxList);
    const m3Max16InchList = sixteenFiltering(m3MaxList);



    const filteredList = [];

    const combinedList = filteredList.concat(
        m1Air13InchList,
        m1Pro13InchList, m1Pro14InchList, m1Pro16InchList,
        m1Max14InchList, m1Max16InchList,
        m2Air13InchList,
        m2Pro14InchList, m2Pro16InchList,
        m2Max14InchList, m2Max16InchList,
        m3Air13InchList,
        m3Pro14InchList, m3Pro16InchList,
        m3Max14InchList, m3Max16InchList
    )

    const dataList = combinedList.filter(item => item !== null);

    return dataList;

}