import { createRouter, createWebHistory } from 'vue-router';

// 현재 URL을 가져옵니다.
const url = window.location.href;
let path = '';
let vuePath = '';
let name = '';

// 로컬 환경
if(process.env.NODE_ENV == 'local') {
    // proto+host
    let protocolEndIndex = url.indexOf("://") + 3;
    let domainEndIndex = url.indexOf("/", protocolEndIndex);
    if (domainEndIndex === -1) domainEndIndex = url.length;
    let domain = url.substring(0, domainEndIndex);

    path = url.split(domain)[1].split('?')[0];
    vuePath = path.split('/page')[0];
    name = vuePath.split('/')[3];

// 개발 환경
} else {
    const windowUrl = new URL( url );
    path = windowUrl.searchParams.get("g_path")
    vuePath = windowUrl.searchParams.get("g_vuePath")
    //const g_menuId = windowUrl.searchParams.get("g_menuId")
}

// 라우터 경로 객체 생성
const route = {
    path: path,
    name: name+'View',
    component: () => import(`../views${vuePath}.vue`) // 동적 import 경로를 계산합니다.
};

// 라우터 생성
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: []  // 초기 routes 배열은 비어 있음
});

// 동적으로 라우트를 추가
router.addRoute(route);


export default router;