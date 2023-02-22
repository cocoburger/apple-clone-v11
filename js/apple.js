// (function () {
//
// })();
(() => {
    let yOffset = 0; //window.scrollY 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보고 있는) 씬
    let enterNewScene = false; //새로운 scene이 시작된 순간 true
    const sceneInfo = [
        {
            id: 1,
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                //여기에 html 객체를 모아둔다.
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values: {
                //어떤 css깂을 어떤 값으로 넣을 것인지 정의
                 messageA_opacity: [0, 1, {aniStart: 0.1, aniEnd: 0.2}],
                 messageB_opacity: [0, 1, {aniStart: 0.3, aniEnd: 0.4}],
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
            },
            values: {
                //어떤 css깂을 어떤 값으로 넣을 것인지 정의
                messageA_opacity: [0,1]
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
            },
            values: {
                //어떤 css깂을 어떤 값으로 넣을 것인지 정의
                messageA_opacity: [0,1]
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
            },
            values: {
                //어떤 css깂을 어떤 값으로 넣을 것인지 정의
                messageA_opacity: [0, 1]
            }
        },
    ]

    /**
     * sceneInfo배열에 있는 scrollHeight를 잡아준다.
     */
    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i< sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i]?.heightNum * window?.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        
        // 현재위치
        yOffset = window.scrollY;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    
    function calcValues() {
        const startOpacity = sceneInfo[currentScene].values.messageA_opacity[0];
        const endOpacity = sceneInfo[currentScene].values.messageA_opacity[1];
        const animationObj = sceneInfo[currentScene].values.messageA_opacity[2];
        const currentYOffset = yOffset - prevScrollHeight; // 현재위치에서 이전 스크롤위치를 빼면 현재 섹션에서의 위치를 알 수 있다.
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight; // 비율을 구한다.
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        
        if (sceneInfo[currentScene].values.length === 3) {
            // start ~end 사이에 애니메이션 실행
            const partScrollStart = animationObj.aniStart * scrollHeight;
            const partScrollEnd = animationObj.aniEnd * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;
            return partScrollHeight * (endOpacity - startOpacity) + startOpacity ;  // opacity 범위
        } else {
            return scrollRatio * (endOpacity - startOpacity) + startOpacity ;  // opacity 범위
        }
        
    }
    
    
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        switch (currentScene) {
            case 0:
                objs.messageA.style.opacity = calcValues();
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default :
        }
        objs.messageA.style.opacity = calcValues();
        console.log(objs.messageA.style.opacity )
    }
    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i  = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene]?.scrollHeight) {
            currentScene++;
            enterNewScene = true;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        
        if (enterNewScene) return;
    
        playAnimation()
    
    }
    window.addEventListener('scroll', () => {
        yOffset = window.scrollY;
        scrollLoop();
    });

    // dom 구조만 로드가 되면 실행 load보다 시기가 더 빠르다.
    // window.addEventListener('DOMContentLoaded', setLayout);
    // 모든 리소스가 로드가 되면 실행
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

    setLayout();
})();
