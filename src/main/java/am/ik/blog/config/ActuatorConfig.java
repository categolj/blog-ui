package am.ik.blog.config;

import org.springframework.boot.actuate.autoconfigure.security.reactive.EndpointRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class ActuatorConfig {

	@Bean
	public SecurityWebFilterChain springWebFilterChain(ServerHttpSecurity http) {
		return http //
				.httpBasic() //
				.and() //
				.authorizeExchange() //
				.matchers(EndpointRequest.to("health", "info")).permitAll() //
				.matchers(EndpointRequest.toAnyEndpoint()).hasRole("ACTUATOR") //
				.anyExchange().permitAll() //
				.and() //
				.build();
	}
}
