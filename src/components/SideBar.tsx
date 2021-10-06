import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { GenreResponseProps } from './Content';
import { Button } from './Button';
import '../styles/sidebar.scss';

interface SideBarProps {
  sideBarItems: {
    handleClickButton: (id: number) => void;
    selectedGenreId: number;
  }
}

export function SideBar(props: SideBarProps) {
  // Complete aqui
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.sideBarItems.handleClickButton(genre.id)}
            selected={props.sideBarItems.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}