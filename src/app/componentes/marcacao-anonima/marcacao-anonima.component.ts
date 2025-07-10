import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UtenteService } from '../../services/utente.service';
import { PedidoService } from '../../services/pedido.service';
import { ProfissionalService } from '../../services/profissional.service';
import { AtoClinico } from '../../enums/ato-clinico.enum';
import { SubSistemaSaude } from '../../enums/subsistema-saude.enum';
import { EstadoPedido } from '../../enums/estado-pedido.enum';
import { Profissional } from '../../models/profissional.model';

@Component({
  selector: 'app-marcacao-anonima',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './marcacao-anonima.component.html',
  styleUrl: './marcacao-anonima.component.css'
})
export class MarcacaoAnonimaComponent implements OnInit {
  marcacaoForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  profissionais: Profissional[] = [];
  
  atosClinicosOptions = Object.values(AtoClinico);
  subsistemasOptions = Object.values(SubSistemaSaude);
  generosOptions = ['Masculino', 'Feminino', 'Outro'];
  horariosOptions = ['Manhã', 'Tarde', 'Indiferente'];

  constructor(
    private fb: FormBuilder,
    private utenteService: UtenteService,
    private pedidoService: PedidoService,
    private profissionalService: ProfissionalService,
    private router: Router
  ) {
    this.marcacaoForm = this.createForm();
  }

  ngOnInit() {
    this.loadProfissionais();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Dados pessoais
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      morada: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      numeroUtente: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      fotografia: [''],
      
      // Dados da marcação
      atos: this.fb.array([], [Validators.required]),
      subsistema: ['', [Validators.required]],
      profissional: [''],
      intervaloDatas: ['', [Validators.required]],
      horarioPreferido: ['', [Validators.required]],
      observacoes: ['']
    });
  }

  loadProfissionais() {
    this.profissionalService.getProfissionais().subscribe({
      next: (profissionais) => {
        this.profissionais = profissionais;
      },
      error: (error) => {
        console.error('Erro ao carregar profissionais:', error);
      }
    });
  }

  get atosFormArray() {
    return this.marcacaoForm.get('atos') as FormArray;
  }

  onAtoChange(ato: AtoClinico, event: any) {
    const atosArray = this.atosFormArray;
    if (event.target.checked) {
      atosArray.push(this.fb.control(ato));
    } else {
      const index = atosArray.controls.findIndex(x => x.value === ato);
      atosArray.removeAt(index);
    }
  }

  isAtoSelected(ato: AtoClinico): boolean {
    return this.atosFormArray.value.includes(ato);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.marcacaoForm.patchValue({
          fotografia: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.marcacaoForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = this.marcacaoForm.value;

      // Primeiro, criar o utente
      const novoUtente = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        morada: formData.morada,
        dataNascimento: formData.dataNascimento,
        genero: formData.genero,
        numeroUtente: formData.numeroUtente,
        fotografia: formData.fotografia || this.getDefaultAvatar(),
        role: 'anonimo' as const
      };

      this.utenteService.registerAnonimo(novoUtente).subscribe({
        next: (utente) => {
          // Depois criar o pedido
          const novoPedido = {
            utenteId: utente.id,
            atos: formData.atos,
            subsistema: formData.subsistema,
            profissional: formData.profissional || undefined,
            intervaloDatas: formData.intervaloDatas,
            horarioPreferido: formData.horarioPreferido,
            observacoes: formData.observacoes || '',
            estado: EstadoPedido.PEDIDO,
            dataSubmissao: new Date().toISOString()
          };

          this.pedidoService.createPedido(novoPedido).subscribe({
            next: (pedido) => {
              this.isLoading = false;
              this.successMessage = `Pedido criado com sucesso! Número do pedido: ${pedido.id}. Será contactado em breve.`;
              this.marcacaoForm.reset();
              this.atosFormArray.clear();
            },
            error: (error) => {
              this.isLoading = false;
              this.errorMessage = 'Erro ao criar o pedido. Tente novamente.';
              console.error('Erro ao criar pedido:', error);
            }
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao registrar dados. Tente novamente.';
          console.error('Erro ao registrar utente:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private getDefaultAvatar(): string {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2Ij5Gb3RvPC90ZXh0Pgo8L3N2Zz4=";
  }

  private markFormGroupTouched() {
    Object.keys(this.marcacaoForm.controls).forEach(key => {
      const control = this.marcacaoForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.marcacaoForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldLabel(fieldName)} é obrigatório.`;
      }
      if (control.errors['email']) {
        return 'Email inválido.';
      }
      if (control.errors['pattern']) {
        if (fieldName === 'telefone' || fieldName === 'numeroUtente') {
          return `${this.getFieldLabel(fieldName)} deve ter 9 dígitos.`;
        }
      }
      if (control.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} deve ter pelo menos 2 caracteres.`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      nome: 'Nome',
      email: 'Email',
      telefone: 'Telefone',
      morada: 'Morada',
      dataNascimento: 'Data de Nascimento',
      genero: 'Gênero',
      numeroUtente: 'Número de Utente',
      atos: 'Atos Clínicos',
      subsistema: 'Subsistema de Saúde',
      intervaloDatas: 'Intervalo de Datas',
      horarioPreferido: 'Horário Preferido'
    };
    return labels[fieldName] || fieldName;
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}