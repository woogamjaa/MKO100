// home 첫 번째 섹션 = 브랜드 메인화면.
import React from 'react';
import Container from '../common/Container';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Section01 = () => {
   let scene = new THREE.Scene();
   let renderer = new THREE.WebGLRenderer({ 
        canvas: document.querySelector('#cnvas'),
        antialias: true, //계단현상 방지
    });
    // renderer.outputEncoding=THREE.sRGBEncoding; // 색상 인코딩
    
    let camera = new THREE.PerspectiveCamera(30,1);
    camera.position.set(0, 0, 5);

    let light = new THREE.DirectionalLight(0xffffff, 10);
    scene.add(light);

    let loader = new GLTFLoader();
    loader.load('/models/scene.gltf', function(gltf) {
        scene.add(gltf.scene);
        renderer.render(scene, camera);
        function animate() {
            requestAnimationFrame(animate); // 1초에 60번 호출
            gltf.scene.rotation.y += 0.003; // 회전 속도 조절
            renderer.render(scene, camera);
        }
        animate();
    });
}

      <Container>
         <canvas id="canvas" width={300} height={300}></canvas>
      </Container>


export default Section01;