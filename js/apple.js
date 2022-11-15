// (function () {
//
// })();
(() => {
    let yOffset = 0; //window.scrollY 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보고 있는) 씬

    const sceneInfo = [
        {
            id: 1,
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                //여기에 html 객체를 모아둔다.
                container: document.querySelector('#scroll-section-0')
            }
        },
        {
            id: 2,
            type: 'normal',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                //여기에 html 객체를 모아둔다.
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            id: 3,
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                //여기에 html 객체를 모아둔다.
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            id: 4,
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                //여기에 html 객체를 모아둔다.
                container: document.querySelector('#scroll-section-3')
            }
        },
    ]

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i< sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i]?.heightNum * window?.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
    }
    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i  = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        console.log(prevScrollHeight)
    }
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.scrollY;
        scrollLoop();
    });
    setLayout();
})();
