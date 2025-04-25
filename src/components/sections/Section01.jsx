// home 첫 번째 섹션 = 브랜드 메인화면.
import React, { useEffect, useRef, useState } from 'react';
import Container from '../common/Container';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Section01 = () => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // 캔버스 크기 계산
    const width = window.innerWidth;
    const height = 500;
    
    // Three.js 설정
    const scene = new THREE.Scene();
    // 배경을 투명하게 설정
    scene.background = null;
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true // 배경 투명하게
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // 카메라 설정
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10); // 카메라 위치 조정
    
    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    // 보조 조명 추가
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);
    
    // 컨트롤 설정 부분 수정
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8; // 회전 속도 조정
    controls.enableZoom = false; // 줌 비활성화
    controls.enablePan = false; // 패닝 비활성화
    controls.minPolarAngle = Math.PI / 2; // 수직 회전 제한 (90도)
    controls.maxPolarAngle = Math.PI / 2; // 수직 회전 제한 (90도)
    controls.enableRotate = true; // 회전 활성화
    
    const loader = new GLTFLoader();
    loader.load(
      '/models/scene.gltf', 
      (gltf) => {
        // 모델의 바운딩 박스 계산
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        
        // 모델 크기 및 위치 조정
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 7 / maxDim; // 적절한 크기로 조정
        gltf.scene.scale.set(scale, scale, scale);
        
        // 모델의 중심이 원점에 오도록 위치 조정
        gltf.scene.position.x = -center.x * scale;
        gltf.scene.position.y = -center.y * scale;
        gltf.scene.position.z = -center.z * scale;
        
        scene.add(gltf.scene);
        setLoading(false);
        
        // 애니메이션 함수
        function animate() {
          requestAnimationFrame(animate);
          // 자동 회전 코드 제거 - 모델은 가만히 있음
          controls.update(); // 컨트롤 업데이트 유지
          renderer.render(scene, camera);
        }
        animate();
      },
      undefined,
      (error) => {
        console.error("모델 로딩 에러:", error);
        setError("모델을 불러오는데 실패했습니다.");
        setLoading(false);
      }
    );
    
    // 창 크기 변경 대응
    const handleResize = () => {
      const newWidth = window.innerWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <Container>
      {loading && <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white'}}>모델 로딩 중...</div>}
      {error && <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'red'}}>{error}</div>}
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '500px', 
          display: 'block'
        }}
      />
    </Container>
  );
};

export default Section01;