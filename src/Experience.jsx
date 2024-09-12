import { useFrame } from '@react-three/fiber'
import { Lightformer, Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'
import * as THREE from 'three'

export default function Experience()
{
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        // const time = state.clock.elapsedTime
		// cube.current.position.x = 2 + Math.sin(time)
        cube.current.rotation.y += delta * 0.2
    })

    const { color, opacity, blur } = useControls('contact shadows',
    {
        color: '#1d8f75',
        opacity: { value:0.4, min:0, max: 1 },
        blur: { value:2.8, min:0, max: 10 },
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [1, 2, 3] }
    })

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
        envMapIntensity: { value:3.5, min:0, max:12 },
        envMapHeight: { value:7, min:0, max:100 },
        envMapRadius: { value:28, min:10, max:1000 },
        envMapScale: { value:100, min:10, max:1000 }
    })

    return <>

        <Environment
            background 
            preset="sunset"
            ground={ {
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale
            }}
            // resolution={ 32 }
        >
            {/* <color args={ ['#000000'] } attach="background" />
            <Lightformer 
                position-z={ -5 } 
                scale={ 5 }
                color="red"
                intensity={ 10 }
                form="ring" 

            /> */}
            {/* <mesh position-z={ -5 } scale={ 10 }>
                <planeGeometry />
                <meshBasicMaterial color={ [10, 0, 0] } />
            </mesh> */}
        </Environment>

        {/* <BakeShadows /> */}
        {/* <SoftShadows size={ 25 } samples={ 10 } focus={ 0 } /> */}
        <ContactShadows 
            position={ [0, 0, 0] }
            scale={ 10 }
            resolution={ 512 }
            far={ 5 }
            color={ color }
            opacity={ opacity }
            blur={ blur }
            frames={ 1 }
        />

        {/* <Sky sunPosition={ sunPosition }/> */}

        <color args={ ['ivory'] } attach="background" />

        <Perf position="top-left" />

        <OrbitControls makeDefault />
{/* 
        <directionalLight 
            ref={ directionalLight } 
            castShadow 
            position={ sunPosition } 
            intensity={ 4.5 }
            shadow-mapSize={ [1024, 1024] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 5 }
            shadow-camera-right={ 5 }
            shadow-camera-bottom={ -5 }
            shadow-camera-left={ -5 }
        /> */}
        {/* <AccumulativeShadows
            position={ [0, -0.99, 0] }
            scale={ 10 }
            color="#316d39"
            opacity={ 0.8 }
            frames={ Infinity }
            temporal
            blend={ 100 }
        >
            <RandomizedLight
                position={ [1, 2, 3] }
                amount={ 8 }
                radius={ 1 }
                ambient={ 0.5 }
                intensity={ 3 }
                bias={ 0.001 }
            />
        </AccumulativeShadows> */}
        {/* <ambientLight intensity={ 1.5 } /> */}

        <mesh castShadow position-y={ 1 } position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={ envMapIntensity } />
        </mesh>

        <mesh ref={ cube } castShadow position-y={ 1 } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={ envMapIntensity } />
        </mesh>

        {/* <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={ envMapIntensity } />
        </mesh> */}

    </>
}