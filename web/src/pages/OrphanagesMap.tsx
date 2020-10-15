import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import '../styles/pages/orphanage-map.css';

function OrphanagesMap() {
  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={mapMarkerImg} alt='' />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Guarulhos</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map center={[-23.4158973, -46.4556157]} zoom={15} style={{ width: '100%', height: '100%' }}>
        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Marker icon={mapIcon} position={[-23.4158973, -46.4556157]}>
          <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
            Lar das meninas
            <Link to='/orphanages/1'>
              <FiArrowRight size={20} color='#fff' />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color='FFF'></FiPlus>
      </Link>
    </div>
  );
}

export default OrphanagesMap;
