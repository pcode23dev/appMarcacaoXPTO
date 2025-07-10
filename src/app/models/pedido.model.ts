import { AtoClinico } from '../enums/ato-clinico.enum';
import { SubSistemaSaude } from '../enums/subsistema-saude.enum';
import { EstadoPedido } from '../enums/estado-pedido.enum';

export interface Pedido {
  id: number;
  utenteId: number;
  atos: AtoClinico[];
  subsistema: SubSistemaSaude;
  profissional?: number; // id do profissional
  intervaloDatas: string;
  horarioPreferido: string;
  observacoes: string;
  estado: EstadoPedido;
  dataSubmissao: string;
}