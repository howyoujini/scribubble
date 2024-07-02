export function ToolBar(props: BackgroundProps) {
  return (
    <div>
      <BackgroundBtn props={props} />
    </div>
  );
}

interface BackgroundProps {
  background?: string;
  onClick?: () => void;
}

const BackgroundBtn = ({ props }) => {
  console.log(props);

  return <input type="color" />;
};

// 배경색 변경 함수
function changeBackgroundColor(color: string) {
  this.scene.background = new this.THREE.Color(color);
}
