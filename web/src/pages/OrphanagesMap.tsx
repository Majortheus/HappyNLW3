import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import '../styles/pages/orphanage-map.css';
import mapMarkerImg from '../images/map-marker.svg';

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
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <Map center={[-23.4158973, -46.4556157]} zoom={15} style={{ width: '100%', height: '100%' }}>
        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      </Map>

      <Link to='' className='create-orphanage'>
        <FiPlus size={32} color='FFF'></FiPlus>
      </Link>
    </div>
  );
}

export default OrphanagesMap;
