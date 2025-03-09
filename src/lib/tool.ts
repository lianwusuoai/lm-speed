import { toPng } from "html-to-image";
import { toast } from "sonner";

export const handleToImage = (id: string) => {
  const node = document.getElementById(id);
  if (!node) {
    toast.error("请等待测试完成");
    return;
  }

  toPng(node)
    .then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = `lm-speed-test-${
        new Date().toISOString().split("T")[0]
      }.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error("Failed to generate image:", error);
      toast.error("Failed to generate image");
    });
};
