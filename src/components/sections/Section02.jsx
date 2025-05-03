import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Section02 = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataDate, setDataDate] = useState(''); // ✅ 날짜 상태 추가

  const getTodayString = (offset = 0) => {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + offset);
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month}-${date}-${year}`;
  };

  useEffect(() => {
    const fetchChartData = async () => {
      for (let offset = 0; offset > -7; offset--) {
        const dateStr = getTodayString(offset);
        const url = `https://raw.githubusercontent.com/woogamjaa/Music_Chart_data/main/melon/melon100_${dateStr}.json`;

        try {
          const response = await axios.get(url);
          setChartData(response.data);
          setDataDate(dateStr); // ✅ 성공한 날짜 저장
          break;
        } catch (err) {
          if (offset === -6) {
            console.error('최근 7일간 데이터가 존재하지 않습니다.');
          }
        }
      }
      setLoading(false);
    };

    fetchChartData();
  }, []);

  if (loading) return <div>데이터 불러오는 중...</div>;

  return (
    <div className="section02">
      <div className="section2-content">
        <h2>Melon Top 100 <span style={{ fontSize: '0.8em', color: '#888' }}>({dataDate} 기준)</span></h2>
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