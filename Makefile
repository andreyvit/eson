
REPORTER=spec

test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER)

test-cov: lib-cov
	EJSON_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov: lib
	jscoverage $< $@ 

tests.md:
	$(MAKE) REPORTER=markdown > tests.md

.PHONY: test test-cov tests.md