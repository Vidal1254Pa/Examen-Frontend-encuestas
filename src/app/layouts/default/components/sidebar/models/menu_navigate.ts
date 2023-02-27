export interface menu_navigate {
  id: number;
  nivel: number;
  titulo: string;
  url?: string;
  parentId?: number;
  icono: string;
  subMenu: menu_navigate[];
  active_link_state:boolean
}
