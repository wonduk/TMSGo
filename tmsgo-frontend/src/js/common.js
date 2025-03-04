import axios from 'axios';

// URL
const windowUrlStr = window.location.href;
const windowUrl = new URL( windowUrlStr );
const g_menuId = windowUrl.searchParams.get("g_menuId");

/* eslint-disable */
export default {
    name: "cmm",
    data() {
      return {
        GFN_SEL_TAB_ID : ""
      }
    },
    methods: {
      /* axios 통신 */
      axios(option, varData) {
        //g_menuId 적용
        if (option.url.indexOf("g_menuId=") == -1) {
            if (option.url.indexOf("?") != -1) {
                option.url = option.url + "&" + "g_menuId=" + g_menuId;
            } else {
                option.url = option.url + "?" + "g_menuId=" + g_menuId;
            }
        }

        // 필수 파라미터
        //var params = Object.assign({"g_menuId": g_menuId}, option.param);

        var method = this.isEmpty(option.method)
            ? "POST"
            : option.method.toUpperCase();
        var fn_axios = null;

        if (method == "GET") {
            fn_axios = axios.get;
        } else {
            fn_axios = axios.post;
        }

        // FormData 생성 (파일 업로드용)
        let dataToSend;
        let headers = { "Content-Type": "application/json; charset=UTF-8" };

        // 파일 업로드인 경우
        if (option.isFileUpload) {
            const formData = new FormData();
            // inputData 문자열 추가
            formData.append("inputData", option.param.inputData);
            if (
                option.param.fileInputs &&
                Array.isArray(option.param.fileInputs)
            ) {
                option.param.fileInputs.forEach((fileInput, index) => {
                    const fileKeyName =
                        fileInput.key || `file_${index + 1}`;
                    const files = fileInput.files; // fileInput.files는 FileList
                    Array.from(files).forEach((file, fileIndex) => {
                        formData.append(`${fileKeyName}`, file);
                    });
                });
            } else if (option.param.file) {
                // 단일 파일 추가
                const fileKeyName = option.param.fileKeyName || "file";
                formData.append(fileKeyName, option.param.file);
            }

            dataToSend = formData;
            headers = { "Content-Type": "multipart/form-data" }; // 멀티파트 헤더
        } else {
            // 일반 JSON 요청인 경우
            dataToSend = JSON.stringify(option.param);
        }

        $Appthis.$refs.loadingCompRef.fn_showLoading();
        fn_axios(option.url, dataToSend, {
            headers: headers,
        })
            .then((response) => {
                let data = response["data"];
                let status = response["status"];
                this.axiosCallback(status, data, option.callback, varData);
            })
            .catch((response) => {
                this.axiosCallback(
                    response["status"],
                    response["statusText"]
                );
            })
            .finally(function () {
                $Appthis.$refs.loadingCompRef.fn_closeLoading();
            });
    },
      /* axios Callback */
    //   axiosCallback(status, response, callback, varData) {
    //     // 정상
    //     if(status == 200) {
    //       if(this.size(response) == 1) {
    //         for(let p in response) {
    //           response = response[p];
    //           break;
    //         }
    //       }
    //       // callback 있는 경우
    //       if(callback != undefined) { callback(response, varData); }
    //     // 오류
    //     } else if (status == undefined){  // callback 함수 내 오류

    //     } else {  
    //       let msg = "요청하신 기능이 잘못되었습니다.";
    //       switch(status) {
    //         case 404 :
    //           msg = "요청하신 기능을 찾을 수 없습니다.";
    //           break;
    //       }
    //       alert(msg);
    //     }
    //   },
    //   /* form객체 데이터 추출 */
    //   getFormData(form) {
    //     let formData = new FormData(form);
    //     const data = {}; 
    //     // need to convert it before using not with XMLHttpRequest
    //     for (let [key, val] of formData.entries()) {
    //           Object.assign(data, {[key]: val})
    //     }
    //     return data
    //   },
    //   /* 사이즈 */
    //   size(object) {
    //     if(object != undefined && object != null && object != "") {
    //       let size = object.length;
    //       if(size == undefined) {
    //         let cnt = 0;
    //         for(let p in object) { 
    //           cnt++; 
    //         }
    //         return cnt;
    //       }
    //       return size;
    //     }
    //     return 0;
    //   },
    //   replaceAll(val, target, replacement) {
    //     return val.split(target).join(replacement);
    //   },
    //   /* empty 판단 */
    //   isEmpty(value){
    //     if( value == "" || value == null || value == "null" || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
    //       return true
    //     }else{
    //       return false
    //     }
    //   },
    //   /**
    //    * axios통신 후 callback데이터 data영역에 추가
    //    * key = responseData의 key과 동일, data = "", 선언 필요.
    //    * @param rows data List
    //    * @param responseData callback데이터
    //    */
    //   gfn_mapResponseToRows(rows, responseData) {
    //     // 데이터 매핑
    //     const updatedRows = rows.map((row) => {
    //       const updatedRow = { ...row }; // 객체 복사
    
    //       if (responseData instanceof Array) {
    //         // Array 타입 데이터 처리 (예: ds[0] 형식)
    //         updatedRow.data = responseData[0][row.key] || ""; // 키가 없으면 빈 문자열
    //       } else {
    //         // Object 타입 데이터 처리 (예: ds 형식)
    //         updatedRow.data = responseData[row.key] || ""; // 키가 없으면 빈 문자열
    //       }
    
    //       return updatedRow;
    //     });
    
    //     return updatedRows;
    //   },
    //   /**
    //    * 1000자리마다 콤마 찍기
    //    * @param obj
    //    * @returns {String}
    //    */
    //   gfn_setComma(target) {
    //     console.log('call setComma')
    //     // Target 값
    //     var value     = target + "";
    //     // minus값 판독
    //     var minus     = value.indexOf("-") > -1 ? "-" : "";
    //     // 콤마를 찍어 return할 값
    //     var retValue  = "";
    //     // 소수점인지 체크
    //     var dot       = value.indexOf(".") > -1;
        
    //     // 값
    //     var value1    = dot == true ? value.split(".")[0] : value;
    //     var value2    = dot == true ? "." + value.split(".")[1] : "";
          
    //     // 해당 값
    //     var cellvalue = value1.replace(" ", "");
          
    //     // target값이 없는 경우 그대로 return
    //     if(cellvalue == "" || cellvalue == "undefined") {
    //         return target;
    //     }
        
    //     // 있는 경우에 콤마 처리
    //     else {
    //       // 글자 길이
    //       var len   = this.size(cellvalue);
    //         for(var i = 1 ; i <= len ; i++) {
    //             if(i > 1 && (i % 3) == 1) {
    //                 retValue = cellvalue.charAt(len - i) + "," + retValue;
    //             }
    //             else {
    //                 retValue = cellvalue.charAt(len - i) + retValue;
    //             }
    //         }
    //     }
        
    //     return minus + retValue + value2;
    //   },
    //   // tab 활성화
    //   gfn_changeTab(tabId) {
    //     this.GFN_SEL_TAB_ID = tabId;
    //   },
    //   // nvl 처리
    //   gfn_nvl(strValue,strValue2){
    //     if(this.isEmpty(strValue)) return strValue2;
    //     return strValue;
    //   },
    //   // 이메일 유효성 체크
    //   gfn_isEmail(strValue){
    //     const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;
    //     return reg.test(strValue);
    //   },
    //   // 전화번호 형식 유효성 체크
    //   gfn_isTelNum(strValue){
    //     let reg = /^(0\d{1,2}\d{3,4}\d{4}|0\d{1,2}\d{3,4}\d{4})$/;
    //     return reg.test(strValue);
    //   },
    //   //0을 붙여 두자리수로 만들어주는 함수 (날짜형식에 사용)
    //   gfn_addZero(target) {
    //     // 숫자로 변환
    //     var num = Number(target);
    //     // 9와 대소비교
    //       var str = num > 9 ? num : "0" + num;
    //       return str.toString();
    //   },
    //    //메뉴패널 보이기,숨기기
    //   handlePanelToggle(isOpen) {
    //     this.isPanelOpen = isOpen;
    //     const searchForm = this.$refs.searchForm;
    //     if (searchForm) {
    //         searchForm.style.height = isOpen ? "auto" : "8px";
    //     }
    //     const searchTable = this.$refs.searchTable;
    //     if (searchTable) {
    //         searchTable.style.display = isOpen ? "table" : "none";
    //     }

    //     for (const key in this.$refs) {
    //       const instance = this.$refs[key];
    //       if(instance.id != null && instance.id.indexOf('aui-grid-wrap-') > -1){
    //         if(isOpen){
    //           instance.$el.style.height = '88%';
    //           instance.resize();
    //         }else{
    //           instance.$el.style.height = '95%';
    //           instance.resize();
    //         }
    //       }
    //     }
    // },
    }
  }
