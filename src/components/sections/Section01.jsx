// home 첫 번째 섹션 = 브랜드 메인화면.
import React, { useEffect, useRef } from 'react';
import Container from '../common/Container';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Section01 = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        if (!canvasRef.current) return;
        
        // Three.js 설정
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvasRef.current,
            alpha: true // 배경 투명하게
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // 조명 설정
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // GLTF 모델 로드
        const loader = new GLTFLoader();
        loader.load('/models/scene.gltf', (gltf) => {
            scene.add(gltf.scene);
            // 모델 크기 조정 필요시
            gltf.scene.scale.set(10, 10, 10);
            // 모델 위치 조정 필요시
            gltf.scene.position.set(0, 1, 0);
        });
        
        // 카메라 위치 설정
        camera.position.z = 5;
        
        // 애니메이션 함수
        const animate = () => {
            requestAnimationFrame(animate);
            // 모델 회전 등 애니메이션 추가 가능
            renderer.render(scene, camera);
        };
        animate();
        
        // 창 크기 변경 대응
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        
        // 컴포넌트 언마운트 시 정리
        return () => {
            window.removeEventListener('resize', handleResize);
            // 메모리 정리
            renderer.dispose();
        };
    }, []);
    
    return (
        <Container className="section01">
            <div className="section01__content">
                <h1>Welcome to Our Brand</h1>
                <p>Your journey starts here.</p>
            </div>
            <canvas 
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1
                }}
            />
        </Container>
    );
}

export default Section01;