package services

import play.api.mvc.{ActionBuilder, Request, RequestHeader}
import services.ActionBuilders.NullSecure
import warwick.sso.{AuthenticatedRequest, LoginContext, RoleName}

/**
  * Test SecurityService that doesn't do any checks - all actions allow the request through.
  */
class NullSecurityService(ctx: LoginContext) extends SecurityService {
  override def UserAction: ActionBuilder[AuthenticatedRequest] = new NullSecure(ctx)
  override def APIAction: ActionBuilder[AuthenticatedRequest] = new NullSecure(ctx)
  override def RequiredUserAction: ActionBuilder[AuthenticatedRequest] = new NullSecure(ctx)
  override def RequiredRoleAction(role: RoleName) = new NullSecure(ctx)
  override def RequiredActualUserRoleAction(role: RoleName) = new NullSecure(ctx)
  override def SecureWebsocket[A](request: RequestHeader)(block: (LoginContext) => TryAccept[A]): TryAccept[A] = block(ctx)
  override implicit def requestContext(implicit request: Request[_]) = ???
}
