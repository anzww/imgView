import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    loadMore();
  }, []);

  const getImg = () => {
    axios.get("api/dm-littlesister?type=json").then(({ data }) => {
      setImgList([...imgList, { img: data.img }]);
    });
  };

  const getVideo = () => {
    axios.get("api/dm-xjj?type=json").then(({ data }) => {
      setImgList([...imgList, { video: data.video }]);
    });
  };

  const loadMore = () => {
    const r = Math.random();
    r >= 0.5 ? getVideo() : getImg();
  };

  return (
    <div className="App">
      {imgList.map((item, index) =>
        item.img ? (
          <img style={{ width: "50%" }} key={index} alt="" src={item.img}></img>
        ) : (
          <video
            style={{ width: "50%" }}
            key={index}
            alt=""
            autoPlay
            src={item.video}
            controls
          ></video>
        )
      )}
      <button style={{ width: "100%", height: 30 }} onClick={loadMore}>
        随机加载更多
      </button>
    </div>
  );
}

export default App;
