import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { FiPlus, FiDelete, FiX } from "react-icons/fi";

import Sidebar from "../components/sidebar/Sidebar";
import mapIcon from "../utils/mapIcon";
import "../styles/pages/create-orphanage.css";

interface Position {
    latitude: number;
    longitude: number;
}

export default function CreateOrphanage() {
    const [position, setPosition] = useState<Position>();

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstructions] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [open_on_weekends, setOpenOnWeekeds] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    function handleMapClick(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;

        setPosition({
            latitude: lat,
            longitude: lng,
        });
    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
      if(!event.target.files){
        return;
      }

      const selectedImages = Array.from(event.target.files);
      setImages([...images , ...selectedImages]);

      const selectedImagesPreview = selectedImages.map(image => URL.createObjectURL(image))
      setPreviewImages([...previewImages, ...selectedImagesPreview]);

      event.target.value = '';
    }

    function handleDeleteImage(indexToDelete: number){
      setImages(images.filter((_, index) => index !== indexToDelete));
      setPreviewImages(previewImages.filter((_, index) => index !== indexToDelete));
    }

    function handleSubmit(event: FormEvent){
      event.preventDefault();
      
      const {latitude, longitude} = position ?? { latitude: null, longitude: null};

      console.log({
        latitude, 
        longitude,
        name,
        about,
        instructions,
        opening_hours,
        open_on_weekends
      })
    }

    return (
        <div id="page-create-orphanage">
            <Sidebar />

            <main>
                <form onSubmit={handleSubmit} className="create-orphanage-form">
                    <fieldset>
                        <legend>Dados</legend>

                        <Map center={[-23.4158973, -46.4556157]} style={{ width: "100%", height: 280 }} zoom={15} onClick={handleMapClick}>
                            <TileLayer url={"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                            {position && <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />}
                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input id="name" value={name} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">
                                Sobre <span>Máximo de 300 caracteres</span>
                            </label>
                            <textarea id="name" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="images-container">

                              {previewImages.map((preview, index) => (
                                <div key={preview}>
                                  <img src={preview} alt={name}/>
                                  <button type="button" className="remove" onClick={() => handleDeleteImage(index)}>
                                    <FiX size={24} color="#FF5555" />
                                  </button>
                                </div>
                              ))}

                              <label htmlFor="image[]" className="new-image">
                                  <FiPlus size={24} color="#15b6d6" />
                              </label>
                            </div>
                            
                            <input type="file" name="" multiple id="image[]" onChange={handleSelectImages}/>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Hórario de funcionamento</label>
                            <input id="opening_hours" value={opening_hours} onChange={e => setOpeningHours(e.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Atende fim de semana</label>

                            <div className="button-select">
                                <button type="button" onClick={() => setOpenOnWeekeds(true)} className={open_on_weekends ? 'active' : ''}>
                                    Sim
                                </button>
                                <button type="button" onClick={() => setOpenOnWeekeds(false)} className={!open_on_weekends ? 'active' : ''}>Não</button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
