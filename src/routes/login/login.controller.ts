import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginService } from './login.service';
import { SolicitaCodigoLoginBody } from './dtos/solicita-codigo-login-body.dto';
import { ValidaCodigoLoginBody } from './dtos/valida-codigo-login-body.dto';
import { ValidaCodigoLoginResponse } from './dtos/valida-codigo-login-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiResponse({
    description: 'Código enviado para o e-mail do usuário',
    status: 201,
  })
  @Post()
  login(@Body() body: SolicitaCodigoLoginBody): Promise<void> {
    return this.loginService.login(body);
  }

  @ApiResponse({
    description: 'Token gerado com sucesso',
    status: 201,
    type: ValidaCodigoLoginResponse,
  })
  @Post('/valida_codigo')
  validaCodigo(
    @Body() body: ValidaCodigoLoginBody,
  ): Promise<ValidaCodigoLoginResponse | void> {
    return this.loginService.validaCodigo(body);
  }

  @ApiResponse({
    description: 'Token valido',
    status: 201,
  })
  @ApiCookieAuth()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Get('valida_token')
  async validaToken(): Promise<void> {
    return undefined;
  }
}
