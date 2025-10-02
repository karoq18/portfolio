'use client'
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            options={{
                fpsLimit: 60,
                background: { color: "transparent" },
                particles: {
                    number: { value: 40 },
                    color: { value: "#7ca12cff" },
                    opacity: {
                        value: { min: 0.3, max: 0.7 },   
                        animation: {
                            enable: true,
                            speed: 1.5,
                            sync: false
                        }
                    },
                    size: {
                        value: { min: 1, max: 3 },      
                        animation: {
                            enable: true,
                            speed: 2,
                            sync: false
                        }
                    },

                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        outModes: "out"
                    },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#7ca12cff",
                        opacity: 0.5,
                        width: 1.5
                    }
                },
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "repulse" }, 
                        onClick: { enable: true, mode: "push" }    
                    },
                    modes: {
                        repulse: { distance: 120 },
                        push: { quantity: 3 }
                    }
                },
                detectRetina: true
            }}
            className="absolute inset-0 z-0"
        />
    );
}
