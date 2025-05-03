import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Section02 = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 날짜를 melon JSON 파일명 형식으로 변환
  const getTodayString = (offset = 0) => {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + offset); // offset: 0 = today, -1 = yesterday
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month}-${date}-${year}`;
  };

  useEffect(() => {
    const todayStr = getTodayString();
    const yesterdayStr = getTodayString(-1);

    const todayUrl = `https://raw.githubusercontent.com/woogamjaa/Music_Chart_data/main/melon/melon100_${todayStr}.json`;
    const yesterdayUrl = `https://raw.githubusercontent.com/woogamjaa/Music_Chart_data/main/melon/melon100_${yesterdayStr}.json`;

    axios.get(todayUrl)
      .then((response) => {
        setChartData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // 오늘 데이터 없으면 어제 데이터로 재시도
          axios.get(yesterdayUrl)
            .then((response) => {
              setChartData(response.data);
            })
            .catch((err) => {
              console.error('어제 데이터도 불러오는 데 실패했습니다:', err);
            })
            .finally(() => setLoading(false));
        } else {
          console.error('데이터를 불러오는 중 오류 발생:', error);
          setLoading(false);
        }
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