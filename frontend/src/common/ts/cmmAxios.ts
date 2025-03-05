import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import { ref } from "vue";

// ✅ 전역적으로 axios 인스턴스 사용 가능
export const cmmAxios = () => {
  const isLoading = ref(false);

  const sendRequest = async (
    option: AxiosRequestConfig & {
      isFileUpload?: boolean;
      param?: any;
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

      if (option.isFileUpload) {
        const formData = new FormData();
        formData.append("inputData", option.param.inputData);

        if (option.param.fileInputs && Array.isArray(option.param.fileInputs)) {
          option.param.fileInputs.forEach((fileInput: any, index: number) => {
            const fileKeyName = fileInput.key || `file_${index + 1}`;
            const files: FileList = fileInput.files;
            Array.from(files).forEach((file) => {
              formData.append(fileKeyName, file);
            });
          });
        } else if (option.param.file) {
          const fileKeyName = option.param.fileKeyName || "file";
          formData.append(fileKeyName, option.param.file);
        }

        dataToSend = formData;
        headers["Content-Type"] = "multipart/form-data";
      } else {
        dataToSend = JSON.stringify(option.param);
      }

      // Axios 요청 실행
      const response: AxiosResponse = await axios({
        ...option,
        data: dataToSend,
        headers,
      });

      return response.data;
    } catch (error: any) {
      console.error("Axios 요청 오류:", error);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return { sendRequest, isLoading };
};
