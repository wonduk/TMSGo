import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { ref } from "vue";

// ✅ 전역적으로 axios 인스턴스를 사용 가능
export const cmmAxios = () => {
    const isLoading = ref(false);

    // ✅ 요청을 실행하고, 결과를 콜백으로 전달하는 함수
    const sendRequest = async (
        option: AxiosRequestConfig & {
            isFileUpload?: boolean;
            param?: any;
            onSuccess?: (data: any) => void; // 성공 시 실행할 콜백
            onError?: (error: any) => void; // 오류 발생 시 실행할 콜백
            onFinally?: () => void; // 요청 완료 후 실행할 콜백
        }
    ): Promise<any> => {
        isLoading.value = true;

        try {
            if (!option.url) {
                throw new Error("URL이 필요합니다.");
            }

            let dataToSend: any;
            let headers: Record<string, string> = {
                "Content-Type": "application/json; charset=UTF-8",
            };

            // ✅ 파일 업로드 처리
            if (option.isFileUpload) {
                const formData = new FormData();
                formData.append("inputData", option.param.inputData);

                if (
                    option.param.fileInputs &&
                    Array.isArray(option.param.fileInputs)
                ) {
                    option.param.fileInputs.forEach(
                        (fileInput: any, index: number) => {
                            const fileKeyName =
                                fileInput.key || `file_${index + 1}`;
                            const files: FileList = fileInput.files;
                            Array.from(files).forEach((file) => {
                                formData.append(fileKeyName, file);
                            });
                        }
                    );
                } else if (option.param.file) {
                    const fileKeyName = option.param.fileKeyName || "file";
                    formData.append(fileKeyName, option.param.file);
                }

                dataToSend = formData;
                headers["Content-Type"] = "multipart/form-data";
            } else {
                dataToSend = option.param;
            }

            // ✅ GET 요청일 경우 Content-Type 제거 및 params 사용
            if (option.method === "GET") {
                delete headers["Content-Type"];
            }

            // ✅ 요청 설정
            let requestConfig: AxiosRequestConfig = {
                ...option,
                headers,
            };

            if (option.method === "GET") {
                requestConfig.params = option.param; // GET 요청은 params 사용
            } else {
                requestConfig.data = dataToSend; // POST, PUT 요청은 body 사용
            }

            // ✅ Axios 요청 실행
            const response: AxiosResponse = await axios(requestConfig);

            // ✅ 응답 확인 로그

            // ✅ 콜백 함수 실행 (성공 시)
            if (option.onSuccess) {
                option.onSuccess(response.data);
            }

            return response.data;
        } catch (error: any) {
            // ✅ 콜백 함수 실행 (에러 발생 시)
            if (option.onError) {
                option.onError(error);
            }

            return null;
        } finally {
            isLoading.value = false;

            // ✅ 콜백 함수 실행 (finally)
            if (option.onFinally) {
                option.onFinally();
            }
        }
    };

    return { sendRequest, isLoading };
};
