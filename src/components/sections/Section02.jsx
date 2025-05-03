import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Section.css'; // CSS 파일 불러오기

const Section02 = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/woogamjaa/Music_Chart_data/main/melon/melon100_5-3-2025.json')
      .then((response) => {
        setChartData(response.data);
      })
      .catch((error) => {
        console.error('멜론 차트 데이터를 불러오는 중 오류 발생:', error);
      });
  }, []);

  return (
    <div className="section02">
      <div className="section2-content">
        <h2>Top 100</h2>
        {chartData.map((song) => (
          <div key={song.rank} className="song-item">
            <img src={song.imageURL} alt={song.title} />
            <div>
              <strong>{song.rank}. {song.title}</strong><br />
              <span>{song.artist}</span><br />
              <em>{song.album}</em>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section02;