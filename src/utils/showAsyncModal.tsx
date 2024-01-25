import { DynamicIcon } from "@/components/Icon";
import AlertModal from "@/components/modal/AlertModal";
import BaseModal from "@/components/modal/BaseModal";
import { useEffect } from "react";
import { overlays } from "./overlays";

interface AsyncModalOptions<T> {
  progress?: string | JSX.Element | null;
  success?: string | JSX.Element | null;
  failure?: string | JSX.Element | null;
  onFailed?: (e: unknown) => void;
  onSucceed?: (result: T) => void;
}

/**
 * 비동기 작업에 대한 세 종류의 모달을 보여줍니다.
 */
export default async function showAsyncModal<T>(
  asyncCallback: Promise<T>,
  {
    progress = "잠시만 기다려주세요",
    success = "성공적으로 완료되었습니다",
    failure = "실패했습니다",
    onFailed = () => {},
    onSucceed = () => {},
  }: AsyncModalOptions<T> = {
    progress: "잠시만 기다려주세요",
    success: "성공적으로 완료되었습니다",
    failure: "예기치 못한 오류로 인해 실패했습니다",
    onFailed: () => {},
    onSucceed: () => {},
  }
): Promise<{ result: T | null; error: unknown | null }> {
  return new Promise(async (res) => {
    const overlayId = overlays.open(() => (typeof progress === "string" ? <BaseModal title={progress} /> : progress));

    const result = await Promise.resolve(asyncCallback)
      .then((result) => ({ result }))
      .catch((error: unknown) => ({ error }));

    overlays.close(overlayId);
    if ("result" in result) {
      onSucceed(result.result);
      overlays.open(({ overlayId: successOverlayId }) => {
        useEffect(() => {
          setTimeout(() => {
            overlays.close(successOverlayId);
          }, 3000);
        }, []);
        return typeof success === "string" ? (
          <AlertModal
            logoImgSrc={<DynamicIcon id="check" size="medium" />}
            title={success}
            onClose={() => {
              overlays.close(successOverlayId);
            }}
          />
        ) : (
          success
        );
      });
      res({ result: result.result, error: null });
    } else {
      onFailed(result.error);
      overlays.open(({ overlayId: failOverlayId }) =>
        typeof failure === "string" ? (
          <AlertModal
            logoImgSrc={<DynamicIcon id="warning" size="medium" />}
            title={failure}
            description="잠시 후 다시 시도해주세요"
            onClose={() => {
              overlays.close(failOverlayId);
            }}
          />
        ) : (
          failure
        )
      );
      res({ result: null, error: result.error });
    }
  });
}
