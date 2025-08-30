(function(){
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    initActiveNav();
    initHeroThree();
    initForm();
  });

  function initActiveNav(){
    const links = document.querySelectorAll('.nav-link');
    const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){
          links.forEach(l => l.classList.remove('active'));
          const active = [...links].find(l => l.getAttribute('href') === '#' + e.target.id);
          active?.classList.add('active');
        }
      });
    }, {threshold: 0.6});
    sections.forEach(s => obs.observe(s));
  }

  function initHeroThree(){
    const container = document.getElementById('hero-canvas');
    if(!container || !window.THREE) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth/container.clientHeight, 0.1, 100);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    const geometry = new THREE.PlaneGeometry(8,8,40,40);
    const material = new THREE.MeshBasicMaterial({color:0x7cf2d4, wireframe:true});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    function animate(){
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth/container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  function initForm(){
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', e => {
      e.preventDefault();
      status.textContent = 'Mensaje enviado (demo).';
      form.reset();
    });
  }
})();
