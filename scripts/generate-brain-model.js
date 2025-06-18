#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import * as THREE from 'three';
import { GLTFExporter } from 'three-stdlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a simple brain-like model
function createBrainModel() {
  const brain = new THREE.Group();
  brain.name = 'Brain';

  // Main brain body - two hemispheres
  const brainMaterial = new THREE.MeshStandardMaterial({
    color: 0xffb6c1, // Light pink
    roughness: 0.8,
    metalness: 0.1,
  });

  // Left hemisphere
  const leftHemisphere = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI);
  const leftMesh = new THREE.Mesh(leftHemisphere, brainMaterial);
  leftMesh.position.set(-0.1, 0, 0);
  leftMesh.name = 'LeftHemisphere';
  brain.add(leftMesh);

  // Right hemisphere
  const rightHemisphere = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI);
  const rightMesh = new THREE.Mesh(rightHemisphere, brainMaterial);
  rightMesh.position.set(0.1, 0, 0);
  rightMesh.rotation.y = Math.PI;
  rightMesh.name = 'RightHemisphere';
  brain.add(rightMesh);

  // Add some brain stem
  const stemGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.8);
  const stemMaterial = new THREE.MeshStandardMaterial({
    color: 0xffa0b4, // Slightly darker pink
    roughness: 0.8,
    metalness: 0.1,
  });
  const stemMesh = new THREE.Mesh(stemGeometry, stemMaterial);
  stemMesh.position.set(0, -0.9, 0);
  stemMesh.name = 'BrainStem';
  brain.add(stemMesh);

  // Add cerebellum
  const cerebellumGeometry = new THREE.SphereGeometry(0.4, 16, 8);
  const cerebellumMaterial = new THREE.MeshStandardMaterial({
    color: 0xff91a4, // Different shade
    roughness: 0.9,
    metalness: 0.05,
  });
  const cerebellumMesh = new THREE.Mesh(cerebellumGeometry, cerebellumMaterial);
  cerebellumMesh.position.set(0, -0.3, -0.7);
  cerebellumMesh.name = 'Cerebellum';
  brain.add(cerebellumMesh);

  // Add corpus callosum (bridge between hemispheres)
  const corpusCallosumGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.6);
  const corpusCallosumMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0, // White matter color
    roughness: 0.7,
    metalness: 0.2,
  });
  const corpusCallosumMesh = new THREE.Mesh(
    corpusCallosumGeometry,
    corpusCallosumMaterial
  );
  corpusCallosumMesh.position.set(0, 0.1, 0);
  corpusCallosumMesh.name = 'CorpusCallosum';
  brain.add(corpusCallosumMesh);

  // Add thalamus (relay station)
  const thalamusGeometry = new THREE.SphereGeometry(0.12, 12, 8);
  const thalamusMaterial = new THREE.MeshStandardMaterial({
    color: 0xe6b3cc, // Light purple-pink
    roughness: 0.8,
    metalness: 0.1,
  });
  const leftThalamus = new THREE.Mesh(thalamusGeometry, thalamusMaterial);
  leftThalamus.position.set(-0.15, -0.1, 0);
  leftThalamus.name = 'LeftThalamus';
  brain.add(leftThalamus);

  const rightThalamus = new THREE.Mesh(thalamusGeometry, thalamusMaterial);
  rightThalamus.position.set(0.15, -0.1, 0);
  rightThalamus.name = 'RightThalamus';
  brain.add(rightThalamus);

  // Add hippocampus (memory formation)
  const hippocampusGeometry = new THREE.CylinderGeometry(0.04, 0.06, 0.3);
  const hippocampusMaterial = new THREE.MeshStandardMaterial({
    color: 0xffccdd, // Lighter pink
    roughness: 0.9,
    metalness: 0.05,
  });
  const leftHippocampus = new THREE.Mesh(
    hippocampusGeometry,
    hippocampusMaterial
  );
  leftHippocampus.position.set(-0.4, -0.2, 0.2);
  leftHippocampus.rotation.z = Math.PI / 4;
  leftHippocampus.name = 'LeftHippocampus';
  brain.add(leftHippocampus);

  const rightHippocampus = new THREE.Mesh(
    hippocampusGeometry,
    hippocampusMaterial
  );
  rightHippocampus.position.set(0.4, -0.2, 0.2);
  rightHippocampus.rotation.z = -Math.PI / 4;
  rightHippocampus.name = 'RightHippocampus';
  brain.add(rightHippocampus);

  // Add amygdala (emotion processing)
  const amygdalaGeometry = new THREE.SphereGeometry(0.06, 8, 6);
  const amygdalaMaterial = new THREE.MeshStandardMaterial({
    color: 0xff99bb, // Pink-red
    roughness: 0.8,
    metalness: 0.1,
  });
  const leftAmygdala = new THREE.Mesh(amygdalaGeometry, amygdalaMaterial);
  leftAmygdala.position.set(-0.35, -0.3, 0.4);
  leftAmygdala.name = 'LeftAmygdala';
  brain.add(leftAmygdala);

  const rightAmygdala = new THREE.Mesh(amygdalaGeometry, amygdalaMaterial);
  rightAmygdala.position.set(0.35, -0.3, 0.4);
  rightAmygdala.name = 'RightAmygdala';
  brain.add(rightAmygdala);

  // Add pituitary gland (hormone control)
  const pituitaryGeometry = new THREE.SphereGeometry(0.04, 8, 6);
  const pituitaryMaterial = new THREE.MeshStandardMaterial({
    color: 0xffdd99, // Yellowish
    roughness: 0.7,
    metalness: 0.2,
  });
  const pituitaryMesh = new THREE.Mesh(pituitaryGeometry, pituitaryMaterial);
  pituitaryMesh.position.set(0, -0.6, 0.2);
  pituitaryMesh.name = 'PituitaryGland';
  brain.add(pituitaryMesh);

  // Add medulla oblongata (vital functions)
  const medullaGeometry = new THREE.CylinderGeometry(0.12, 0.15, 0.4);
  const medullaMaterial = new THREE.MeshStandardMaterial({
    color: 0xff88aa, // Deeper pink
    roughness: 0.8,
    metalness: 0.1,
  });
  const medullaMesh = new THREE.Mesh(medullaGeometry, medullaMaterial);
  medullaMesh.position.set(0, -1.2, 0);
  medullaMesh.name = 'MedullaOblongata';
  brain.add(medullaMesh);

  // Add pons (bridge in brainstem)
  const ponsGeometry = new THREE.CylinderGeometry(0.16, 0.14, 0.3);
  const ponsMaterial = new THREE.MeshStandardMaterial({
    color: 0xff77aa, // Medium pink
    roughness: 0.8,
    metalness: 0.1,
  });
  const ponsMesh = new THREE.Mesh(ponsGeometry, ponsMaterial);
  ponsMesh.position.set(0, -0.7, 0);
  ponsMesh.name = 'Pons';
  brain.add(ponsMesh);

  // Add midbrain
  const midbrainGeometry = new THREE.CylinderGeometry(0.14, 0.16, 0.25);
  const midbrainMaterial = new THREE.MeshStandardMaterial({
    color: 0xff99aa, // Light-medium pink
    roughness: 0.8,
    metalness: 0.1,
  });
  const midbrainMesh = new THREE.Mesh(midbrainGeometry, midbrainMaterial);
  midbrainMesh.position.set(0, -0.45, 0);
  midbrainMesh.name = 'Midbrain';
  brain.add(midbrainMesh);

  // Add frontal lobe markers (important functional areas)
  const frontalLobeGeometry = new THREE.SphereGeometry(0.08, 10, 8);
  const frontalLobeMaterial = new THREE.MeshStandardMaterial({
    color: 0xccffcc, // Light green for functional distinction
    roughness: 0.7,
    metalness: 0.3,
  });
  const leftFrontalLobe = new THREE.Mesh(
    frontalLobeGeometry,
    frontalLobeMaterial
  );
  leftFrontalLobe.position.set(-0.4, 0.3, 0.7);
  leftFrontalLobe.name = 'LeftFrontalLobe';
  brain.add(leftFrontalLobe);

  const rightFrontalLobe = new THREE.Mesh(
    frontalLobeGeometry,
    frontalLobeMaterial
  );
  rightFrontalLobe.position.set(0.4, 0.3, 0.7);
  rightFrontalLobe.name = 'RightFrontalLobe';
  brain.add(rightFrontalLobe);

  // Add occipital lobe markers (visual processing)
  const occipitalLobeGeometry = new THREE.SphereGeometry(0.07, 10, 8);
  const occipitalLobeMaterial = new THREE.MeshStandardMaterial({
    color: 0xccccff, // Light blue for visual areas
    roughness: 0.7,
    metalness: 0.3,
  });
  const leftOccipitalLobe = new THREE.Mesh(
    occipitalLobeGeometry,
    occipitalLobeMaterial
  );
  leftOccipitalLobe.position.set(-0.3, 0.2, -0.8);
  leftOccipitalLobe.name = 'LeftOccipitalLobe';
  brain.add(leftOccipitalLobe);

  const rightOccipitalLobe = new THREE.Mesh(
    occipitalLobeGeometry,
    occipitalLobeMaterial
  );
  rightOccipitalLobe.position.set(0.3, 0.2, -0.8);
  rightOccipitalLobe.name = 'RightOccipitalLobe';
  brain.add(rightOccipitalLobe);

  // Add some surface detail - small bumps to simulate brain folds
  for (let i = 0; i < 20; i++) {
    const bumpGeometry = new THREE.SphereGeometry(0.05, 8, 4);
    const bumpMesh = new THREE.Mesh(bumpGeometry, brainMaterial);

    // Random position on brain surface
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    const radius = 1.05;

    bumpMesh.position.set(
      radius * Math.sin(theta) * Math.cos(phi) + (Math.random() - 0.5) * 0.2,
      radius * Math.cos(theta) + (Math.random() - 0.5) * 0.2,
      radius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 0.2
    );

    bumpMesh.name = `BrainFold_${i}`;
    brain.add(bumpMesh);
  }

  /*
   * Additional brain components that could be added for more detail:
   *
   * FUNCTIONAL AREAS:
   * - Temporal lobes (auditory processing, language)
   * - Parietal lobes (sensory integration)
   * - Broca's area (speech production)
   * - Wernicke's area (language comprehension)
   * - Motor cortex and sensory cortex strips
   * - Visual cortex in occipital lobe
   *
   * LIMBIC SYSTEM:
   * - Cingulate cortex (emotion, decision making)
   * - Fornix (memory pathway)
   * - Mammillary bodies (memory)
   *
   * DEEP STRUCTURES:
   * - Basal ganglia (movement control)
   *   - Caudate nucleus
   *   - Putamen
   *   - Globus pallidus
   * - Hypothalamus (homeostasis)
   * - Pineal gland (circadian rhythms)
   *
   * CRANIAL NERVES:
   * - Optic nerves (vision)
   * - Olfactory bulbs (smell)
   * - Trigeminal nerve (facial sensation)
   * - Facial nerve (facial muscles)
   * - Vagus nerve (autonomic functions)
   *
   * VASCULAR SYSTEM:
   * - Circle of Willis (blood supply)
   * - Major arteries and veins
   *
   * WHITE MATTER TRACTS:
   * - Internal capsule
   * - Arcuate fasciculus
   * - Uncinate fasciculus
   *
   * VENTRICULAR SYSTEM:
   * - Lateral ventricles
   * - Third ventricle
   * - Fourth ventricle
   * - Cerebral aqueduct
   */

  return brain;
}

// Create scene and export
function generateBrainGLB() {
  const scene = new THREE.Scene();

  // Add the brain model
  const brain = createBrainModel();
  scene.add(brain);

  // Add some basic lighting info (will be ignored in GLB but good practice)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);

  scene.add(ambientLight);
  scene.add(directionalLight);

  // Export to GLB
  const exporter = new GLTFExporter();

  exporter.parse(
    scene,
    function (result) {
      // Ensure the public/models directory exists
      const modelsDir = join(__dirname, '..', 'public', 'models');
      mkdirSync(modelsDir, { recursive: true });

      // Write the GLB file
      const outputPath = join(modelsDir, 'brain.glb');
      writeFileSync(outputPath, new Uint8Array(result));

      // Generate and write brain-map.json
      const brainMapData = generateBrainMapJSON(brain);
      const brainMapPath = join(__dirname, '..', 'public', 'brain-map.json');
      writeFileSync(brainMapPath, JSON.stringify(brainMapData, null, 2));

      // eslint-disable-next-line no-console
      console.log('✅ Brain model generated successfully!');
      // eslint-disable-next-line no-console
      console.log(`📁 GLB saved to: ${outputPath}`);
      // eslint-disable-next-line no-console
      console.log(`📋 JSON saved to: ${brainMapPath}`);
      // eslint-disable-next-line no-console
      console.log('🧠 The brain model includes:');
      // eslint-disable-next-line no-console
      console.log('   - Left and right hemispheres');
      // eslint-disable-next-line no-console
      console.log('   - Brain stem (midbrain, pons, medulla)');
      // eslint-disable-next-line no-console
      console.log('   - Cerebellum');
      // eslint-disable-next-line no-console
      console.log('   - Corpus callosum (hemisphere bridge)');
      // eslint-disable-next-line no-console
      console.log('   - Thalamus (left & right)');
      // eslint-disable-next-line no-console
      console.log('   - Hippocampus (memory centers)');
      // eslint-disable-next-line no-console
      console.log('   - Amygdala (emotion centers)');
      // eslint-disable-next-line no-console
      console.log('   - Pituitary gland');
      // eslint-disable-next-line no-console
      console.log('   - Frontal lobes (executive function)');
      // eslint-disable-next-line no-console
      console.log('   - Occipital lobes (visual processing)');
      // eslint-disable-next-line no-console
      console.log('   - Surface detail (cortical folds)');
      // eslint-disable-next-line no-console
      console.log('🔄 Brain-map.json synchronized with 3D model');
    },
    function (error) {
      // eslint-disable-next-line no-console
      console.error('❌ Error generating brain model:', error);
    },
    {
      binary: true,
      embedImages: true,
      includeCustomExtensions: false,
    }
  );
}

// Function to generate brain-map.json from the 3D model
function generateBrainMapJSON(brain) {
  const regions = [];

  // Define the mapping between 3D model components and brain map regions
  const componentMap = {
    LeftHemisphere: {
      name: 'Left Hemisphere',
      role: 'Language, Logic, Analysis',
      color: '#ffb6c1',
      tooltip: 'The analytical powerhouse — where language and logic converge.',
    },
    RightHemisphere: {
      name: 'Right Hemisphere',
      role: 'Creativity, Spatial Processing',
      color: '#ffb6c1',
      tooltip: 'The creative center — imagination and spatial awareness unite.',
    },
    LeftFrontalLobe: {
      name: 'Left Frontal Lobe',
      role: 'Planning, Decision-Making',
      color: '#ccffcc',
      tooltip:
        "The captain's bridge — calculating every move, weighing every path.",
    },
    RightFrontalLobe: {
      name: 'Right Frontal Lobe',
      role: 'Executive Function, Personality',
      color: '#ccffcc',
      tooltip: 'Command center for personality and complex thinking.',
    },
    LeftOccipitalLobe: {
      name: 'Left Occipital Lobe',
      role: 'Visual Processing',
      color: '#ccccff',
      tooltip: "Vision's gateway — transforming light into sight.",
    },
    RightOccipitalLobe: {
      name: 'Right Occipital Lobe',
      role: 'Visual Processing',
      color: '#ccccff',
      tooltip: 'The other half of vision — completing the visual picture.',
    },
    LeftAmygdala: {
      name: 'Left Amygdala',
      role: 'Emotional Regulation, Fear',
      color: '#ff99bb',
      tooltip: 'The ancient alarm bell — it rings before you even know why.',
    },
    RightAmygdala: {
      name: 'Right Amygdala',
      role: 'Emotional Processing',
      color: '#ff99bb',
      tooltip: "Emotion's twin guardian — processing feelings and threats.",
    },
    Cerebellum: {
      name: 'Cerebellum',
      role: 'Coordination, Balance, Motor Learning',
      color: '#ff91a4',
      tooltip: 'Keeps you steady on your feet and guides fluid motion.',
    },
    LeftHippocampus: {
      name: 'Left Hippocampus',
      role: 'Memory Formation, Learning',
      color: '#ffccdd',
      tooltip:
        "Memory's architect — building bridges between past and present.",
    },
    RightHippocampus: {
      name: 'Right Hippocampus',
      role: 'Spatial Memory, Navigation',
      color: '#ffccdd',
      tooltip: 'The inner GPS — mapping memories in space and time.',
    },
    LeftThalamus: {
      name: 'Left Thalamus',
      role: 'Sensory Relay, Consciousness',
      color: '#e6b3cc',
      tooltip:
        "The brain's switchboard — routing messages to their destinations.",
    },
    RightThalamus: {
      name: 'Right Thalamus',
      role: 'Sensory Integration',
      color: '#e6b3cc',
      tooltip: "Consciousness gateway — filtering reality's endless stream.",
    },
    CorpusCallosum: {
      name: 'Corpus Callosum',
      role: 'Inter-hemispheric Communication',
      color: '#f0f0f0',
      tooltip: 'The great bridge — connecting left and right minds.',
    },
    BrainStem: {
      name: 'Brain Stem',
      role: 'Vital Functions, Breathing',
      color: '#ffa0b4',
      tooltip: "Life's control center — breath, heartbeat, and survival.",
    },
    Midbrain: {
      name: 'Midbrain',
      role: 'Visual/Auditory Reflexes',
      color: '#ff99aa',
      tooltip: 'Reflex central — instant responses to sight and sound.',
    },
    Pons: {
      name: 'Pons',
      role: 'Sleep, Arousal, Facial Sensation',
      color: '#ff77aa',
      tooltip: 'The bridge of consciousness — between sleep and wake.',
    },
    MedullaOblongata: {
      name: 'Medulla Oblongata',
      role: 'Vital Functions Control',
      color: '#ff88aa',
      tooltip: 'The anchor of life — controlling breath and heartbeat.',
    },
    PituitaryGland: {
      name: 'Pituitary Gland',
      role: 'Hormone Regulation',
      color: '#ffdd99',
      tooltip: "The master gland — orchestrating the body's chemical symphony.",
    },
  };

  // Extract regions from the brain model
  brain.children.forEach((child) => {
    if (componentMap[child.name]) {
      const info = componentMap[child.name];
      const region = {
        id: child.name.charAt(0).toLowerCase() + child.name.slice(1), // camelCase
        name: info.name,
        role: info.role,
        color: info.color,
        position: [child.position.x, child.position.y, child.position.z],
        tooltip: info.tooltip,
      };
      regions.push(region);
    }
  });

  return { regions };
}

// Run the generator
// eslint-disable-next-line no-console
console.log('🔧 Generating brain 3D model...');
generateBrainGLB();
