import { useId } from "react";
import { usePwaInstall } from "@/features/pwa-install/hooks/usePwaInstall";
import styles from "./PwaInstall.module.scss";

export const PwaInstall = () => {
  const guideId = useId();
  const { install, installed, canPrompt, guideOpen } = usePwaInstall();

  if (installed) return null;

  return (
    <>
      <button
        type="button"
        className={styles.installAction}
        aria-expanded={canPrompt ? undefined : guideOpen}
        aria-controls={canPrompt ? undefined : guideId}
        onClick={install}
      >
        添加到主屏幕
      </button>
      <dl id={guideId} className={styles.installGuide} hidden={canPrompt || !guideOpen}>
        <div>
          <dt>iPhone</dt>
          <dd>在 Safari 的分享菜单中选择「添加到主屏幕」。</dd>
        </div>
        <div>
          <dt>Android</dt>
          <dd>在浏览器菜单中选择「安装应用」或「添加到主屏幕」。</dd>
        </div>
      </dl>
    </>
  );
};
