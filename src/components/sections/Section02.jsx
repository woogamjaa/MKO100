import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Section02 = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 오늘 날짜를 melon JSON 파일명 형식으로 변환
  const getTodayString = () => {
    const today = new Date();
    const month = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const date = today.getDate();
    const year = today.getFullYear();
    return `${month}-${date}-${year}`;
  };

  useEffect(() => {
    const todayStr = getTodayString();
    const url = `https://raw.githubusercontent.com/woogamjaa/Music_Chart_data/main/melon/melon100_${todayStr}.json`;

    axios.get(url)
      .then((response) => {
        setChartData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      });
  }, []);

  if (loading) return <div>데이터 불러오는 중...</div>;

  return (
    <div className="section02">
      <div className="section2-content">
        <h2>Melon Top 100</h2>
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